import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../Components';
import { useHistory } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem, Switch, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { HallType, ShowScheduleType, HallListType } from '../../Main/Type';
import { useShowScheduleListState, useFetchShowSchedule, useShowScheduleListObjState, useTotalPageState } from '../../Main/ShowScheduleModel';
import { useFetchHallFunction, useHallListState } from '../../Main/HallListModel';
import { useFetchMovieFunction, useMovieListObjState } from '../../Main/MovieListModel';
import { ModalComponent } from '../../Components';
import "../../scss/pages/adminshowschedule.scss";
import { getDateString } from "../../Function";

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';
import { Pagination } from '@material-ui/lab';

const AdminShowSchedule = () => {
	const AUTH_TOKEN = useTokenState();
	const history = useHistory();
	const totalPage = useTotalPageState();
	const fetchShowSchedule = useFetchShowSchedule();
	const fetchHall = useFetchHallFunction();
	const fetchMovie = useFetchMovieFunction();
	const showScheduleList = useShowScheduleListState();
	const showScheduleListObj = useShowScheduleListObjState();
	const hallList = useHallListState();
	const movieList = useMovieListObjState();

	useEffect(() => {
		fetchShowSchedule(page);
		fetchHall();
		fetchMovie();
	}, []);


	/** 조건 */
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		// stat과 sort는 바뀔 때마다 재구성
		fetchShowSchedule(page);
	}, [page]);

	const handlePageChange = (e: any, pageNumber: number) => { setPage(pageNumber); };


	/* 검색 조건 */
	const [searchHallId, setSearchHallId] = useState<number[]>([]);
	const [searchMovieId, setSearchMovieId] = useState<number[]>([]);
	const [searchStartDate, setSearchStartDate] = useState<string>("");
	const [searchEndDate, setSearchEndDate] = useState<string>("");

	/* 상영일정 관리 */

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [modalType, setModalType] = useState<boolean>(true); // 추가(true)인지 수정(false)인지 구분
	const [showId, setShowId] = useState<number>(-1);

	const [hallId, setHallId] = useState<number>(-1);
	const [movieId, setMovieId] = useState<number>(-1);
	const [showDate, setShowDate] = useState<string>("");
	const [showTime, setShowTime] = useState<string>("");

	/* 검색 조건 */
	const search = () => {
		fetchShowSchedule(page, searchMovieId, searchHallId, searchStartDate, searchEndDate);
	}

	/* 상영일정 관리 */

	const saveShowSchedule = () => {
		if (modalType) {
			axios.post(`${SERVER_URL}/showschedule/add`, {
				"movi_id": movieId,
				"hall_id": hallId,
				"show_date": showDate,
				"show_time": showTime
			}, {
				headers: {
					TOKEN: AUTH_TOKEN
				}
			})
				.then((res) => {
					alert("상영일정이 정상적으로 추가되었습니다.")
					fetchShowSchedule(page);
					setModalOpen(false);
				})
				.catch((e) => {
					errorHandler(e, true);
				});
		} else {
			isBookExist(showId).then((res) => {
				if (!res) {
					axios.put(`${SERVER_URL}/showschedule/update`, {
						"show_id": showId,
						"movi_id": movieId,
						"hall_id": hallId,
						"show_date": showDate,
						"show_time": showTime
					}, {
						headers: {
							TOKEN: AUTH_TOKEN
						}
					})
						.then((res) => {
							alert("상영일정이 정상적으로 수정되었습니다.")
							fetchShowSchedule(page);
							setModalOpen(false);
						})
						.catch((e) => {
							errorHandler(e, true);
						});
				} else {
					alert("예매가 있으므로 수정할 수 없습니다.");
				}
			})
		}
	}

	const getHallListMenu = () => {
		if (!hallList)
			return;
		const DOM = [];
		for (const hall_id in hallList) {
			DOM.push(<MenuItem key={hall_id} value={hall_id}>{hallList[hall_id].hall_name}</MenuItem>);
		}
		return DOM;
	}

	const handleHallChange = (e: any) => {
		const hall_id = Number(e.target.value);
		setHallId(hall_id);
	}

	const getMovieListMenu = () => {
		if (!movieList)
			return;
		const DOM = [];
		for (const movi_id in movieList) {
			DOM.push(<MenuItem key={movi_id} value={movi_id}>{movieList[movi_id].movi_name}</MenuItem>);
		}
		return DOM;
	}

	const handleMovieChange = (e: any) => {
		const movi_id = Number(e.target.value);
		setMovieId(movi_id);
	}

	const handleShowTimeChange = (e: any) => {
		let timeString = e.target.value as string;
		timeString = timeString.split(':').join('');
		setShowTime(timeString);
	}

	const handleAddButtonClick = () => { // 추가 버튼 클릭 시
		setModalOpen(true);
		setModalType(true);

		// modal 정보 초기화
		setShowId(-1);
		setHallId(-1);
		setMovieId(-1);
		setShowDate("");
		setShowTime("");
	}

	const isBookExist = (show_id: number) => {
		return axios.get(`${SERVER_URL}/showschedule/${show_id}/book`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				return false;
			})
			.catch((e) => {
				return true;
			});
	}

	const handleModifyButtonClick = (show_id: number) => { // 수정 버튼 클릭 시 
		if (!showScheduleListObj || !showScheduleListObj[show_id])
			return;
		setModalOpen(true);
		setModalType(false);

		// 기존 정보 저장
		const schedule: ShowScheduleType = showScheduleListObj[show_id];
		setShowId(show_id);
		setHallId(schedule.hall_id);
		setMovieId(schedule.movi_id);
		setShowDate(schedule.show_date);
		setShowTime(schedule.show_time);
	}

	const removeShowSchedule = (show_id: number) => {
		if (!confirm(`해당 상영일정을 삭제하시겠습니까?`))
			return;

		isBookExist(showId).then((res) => {
			if (!res) {
				axios.delete(`${SERVER_URL}/showschedule/delete/${show_id}`, {
					headers: {
						TOKEN: AUTH_TOKEN
					}
				})
					.then((res) => {
						alert("상영일정이 정상적으로 삭제되었습니다.")
						fetchShowSchedule(page);
					})
					.catch((e) => {
						errorHandler(e, true);
					});
			} else {
				alert("예매가 있으므로 삭제할 수 없습니다.");
			}
		});
	}

	/** 상영 시작 */
	const startShow = (show_id: number) => {
		axios.get(`${SERVER_URL}/showschedule/start/${show_id}`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("상영이 시작되었습니다.");
				fetchShowSchedule(page);
			})
			.catch((e) => {
				errorHandler(e, true, ["", "", "", "", "상영일정 시작 시간 이후에만 누르실 수 있습니다."]);
			});
	}

	return (
		<>
			<PageTitle title="상영일정 페이지" isButtonVisible={false} />
			<div className="save-btn">
				<Button variant="outlined" color="secondary" onClick={handleAddButtonClick}>상영일정 추가</Button>
			</div>
			<div className="schedule-con">
				<div className="schedule-header">
					<div className="search-con">
						<div>
							<FormControl>
								<InputLabel id="select-label">상영관 선택</InputLabel>
								<Select
									className="search-input"
									multiple={true}
									labelId="select-label"
									value={searchHallId}
									onChange={(e: any) => setSearchHallId(e.target.value)}
								>
									{
										getHallListMenu()
									}
								</Select>
							</FormControl>
							<FormControl>
								<InputLabel id="select-label">영화 선택</InputLabel>
								<Select
									className="search-input"
									multiple={true}
									labelId="select-label"
									value={searchMovieId}
									onChange={(e: any) => setSearchMovieId(e.target.value)}
								>
									{
										getMovieListMenu()
									}
								</Select>
							</FormControl>
							<TextField
								className="search-input"
								type="date"
								label="기간 시작"
								InputLabelProps={{
									shrink: true,
								}}
								value={getDateString(searchStartDate)}
								onChange={(e: any) => setSearchStartDate(e.target.value.split("-").join(""))}
							/>
							<TextField
								className="search-input"
								type="date"
								label="기간 종료"
								InputLabelProps={{
									shrink: true,
								}}
								value={getDateString(searchEndDate)}
								onChange={(e: any) => setSearchEndDate(e.target.value.split("-").join(""))}
							/>
							<Button className="search-btn" variant="contained" color="primary" onClick={search}>조건 검색</Button>
						</div>
					</div>
				</div>
				<div className="schedule-con">
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className="table-title">번호</TableCell>
								<TableCell className="table-title">상영관</TableCell>
								<TableCell className="table-title">영화</TableCell>
								<TableCell className="table-title">상영일자</TableCell>
								<TableCell className="table-title">상영시작시각</TableCell>
								<TableCell className="table-title">상영종료시각</TableCell>
								<TableCell className="table-title">상영시작</TableCell>
								<TableCell className="table-title">수정</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								showScheduleList &&
								showScheduleList.map((schedule: ShowScheduleType, index: number) => {
									const endTime = schedule.end_time.split("/");
									return (
										<TableRow key={schedule.show_id}>
											<TableCell className="table-content">{index + 1}</TableCell>
											<TableCell className="table-content">{schedule.hall_name}</TableCell>
											<TableCell className="table-content">{schedule.movi_name}</TableCell>
											<TableCell className="table-content">{`${schedule.show_date.substr(0, 4)}/${schedule.show_date.substr(4, 2)}/${schedule.show_date.substr(6, 2)}`}</TableCell>
											<TableCell className="table-content">{`${schedule.show_time.substr(0, 2)}시 ${schedule.show_time.substr(2, 2)}분`}</TableCell>
											<TableCell className="table-content">{`${endTime[endTime.length - 2]}시 ${endTime[endTime.length - 1]}분`}</TableCell>
											<TableCell className="table-content">
												{
													schedule.started && schedule.started === "0" ?
														<Button onClick={() => startShow(schedule.show_id)} variant="outlined" color="secondary">상영시작</Button> :
														<Button variant="outlined" color="default" disabled={true}>상영완료</Button>
												}
											</TableCell>
											<TableCell className="modify-btn-con">
												<Button variant="contained" color="primary" onClick={() => handleModifyButtonClick(schedule.show_id)}>상영일정 수정</Button>
												<Button variant="contained" color="secondary" onClick={() => removeShowSchedule(schedule.show_id)}>상영일정 삭제</Button>
											</TableCell>
										</TableRow>
									);
								})
							}
						</TableBody>
					</Table>
				</div>
				<Pagination className="pagination" count={totalPage} page={page} onChange={handlePageChange} />
			</div>
			<ModalComponent
				open={modalOpen}
				setOpen={setModalOpen}
				title={modalType ? "상영일정 추가" : "상영일정 수정"}
				button={modalType ? "추가" : "수정"}
				buttonOnClick={saveShowSchedule}
			>
				<div className="schedule-modal">
					<div>
						<FormControl>
							<InputLabel id="select-label">상영관</InputLabel>
							<Select
								className="schedule-input"
								labelId="select-label"
								value={hallId}
								onChange={handleHallChange}
							>
								{
									getHallListMenu()
								}
							</Select>
						</FormControl>
						<FormControl>
							<InputLabel id="select-label">영화</InputLabel>
							<Select
								className="schedule-input"
								labelId="select-label"
								value={movieId}
								onChange={handleMovieChange}
							>
								{
									getMovieListMenu()
								}
							</Select>
						</FormControl>
					</div>
					<div>
						<TextField
							className="schedule-input"
							type="date"
							label="상영일자"
							InputLabelProps={{
								shrink: true,
							}}
							value={getDateString(showDate)}
							onChange={(e: any) => setShowDate(e.target.value.split("-").join(""))}
						/>
						<TextField
							className="schedule-input"
							type="time"
							label="상영시작시각"
							InputLabelProps={{
								shrink: true,
							}}
							value={showTime.substr(0, 2) + ":" + showTime.substr(2, 2)}
							onChange={handleShowTimeChange}
						/>
					</div>
				</div>
			</ModalComponent>
		</>
	);
}

export default AdminShowSchedule;