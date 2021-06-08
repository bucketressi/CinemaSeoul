import React, { DOMElement, ReactElement, useEffect, useState } from 'react';
import clsx from 'clsx';
import { ModalComponent, PageTitle } from '../../Components';
import { FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField } from '@material-ui/core';
import { useHallListState, useFetchHallFunction } from '../../Main/HallListModel';
import { useSeatTypeCodeState } from '../../Main/CodeModel';
import { HallType, HallListType, SeatObjType, SeatType, CodeMatch } from '../../Main/Type';
import "../../scss/pages/adminhall.scss";

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';

const AdminHall = () => {
	const AUTH_TOKEN = useTokenState();
	const fetchHall = useFetchHallFunction();
	const hallList = useHallListState();
	const seatTypeCode = useSeatTypeCodeState();

	const [halls, setHalls] = useState<HallListType>({});

	/* 좌석 수정 */
	const [modalID, setModalID] = useState<number>(-1);
	const [modalHall, setModalHall] = useState<HallType | undefined>(undefined);
	const [modalSeat, setModalSeat] = useState<SeatObjType | undefined>(undefined);

	const [selectedSeat, setSelectedSeat] = useState<number>(-1);
	const [seatType, setSeatType] = useState<string>("");
	const [seatTypeCodeObj, setSeatTypeCodeObj] = useState<CodeMatch>({});

	/* 상영관 추가 */
	const [hallName, setHallName] = useState<string>("");
	const [hallCol, setHallCol] = useState<number>(0);
	const [hallRow, setHallRow] = useState<number>(0);

	/* 모달 관리 */
	const [openSeatModal, setOpenSeatModal] = useState<boolean>(false);
	const [openSeatTypeModal, setOpenSeatTypeModal] = useState<boolean>(false);
	const [openAddHall, setOpenAddHall] = useState<boolean>(false);


	useEffect(() => {
		fetchHall();
	}, []);

	useEffect(() => {
		if (!hallList)
			return;
		setHalls(hallList); // 지역 변수로 옮기기
	}, [hallList]);

	useEffect(() => {
		// modal에 띄울 hall이 바뀔 떄마다 좌석 정보도 변경
		if (modalID == -1 || !halls || halls[modalID] == undefined)
			return;
		setModalHall(halls[modalID]);
		fetchSeat();
	}, [modalID]);

	const fetchSeat = () => {
		axios.get(`${SERVER_URL}/hall/select/${modalID}`, { // seat 받아오기
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data?.seats)
					return;
				const obj: SeatObjType = {};
				res.data.seats.forEach((seat: SeatType) => {
					obj[seat.seat_num] = seat;
				});
				setModalSeat(obj);
			})
			.catch((e) => {
				errorHandler(e, true, ["", "", "", ""]);
			});
	}

	const handleNameChange = (e: any, id: number) => {
		const obj = Object.assign({}, halls);
		obj[id].hall_name = e.target.value;
		setHalls(obj);
	}

	/* 좌석 수정 */

	useEffect(() => {
		const obj: CodeMatch = {};
		seatTypeCode.forEach((code) => {
			obj[Number(code.code_id)] = code.code_name;
		})
		setSeatTypeCodeObj(obj);
	}, [seatTypeCode]);

	const saveHallName = (id: number) => {
		axios.put(`${SERVER_URL}/hall`, {
			"hall_id": id,
			"hall_name": halls[id].hall_name
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const removeHall = (hall_id: number) => {
		if (!hallList)
			return;
		if (!confirm(`[${hallList[hall_id].hall_name}] 상영관을 삭제하시겠습니까?`))
			return;
		axios.delete(`${SERVER_URL}/hall/delete/${hall_id}`, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				fetchHall();
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const saveSeat = () => {
		// todo : modalID의 상영관 좌석 저장
		setOpenSeatModal(false);
	}

	const handleSeatModal = (id: number) => {
		// 해당 id의 상영관 띄우기
		setOpenSeatModal(true);
		setModalID(id);
	}

	const getColArray = (col: number) => {
		const arr = [];
		for (let i = 1; i <= col; i++) {
			arr.push(i);
		}
		return arr;
	}

	const getSeatArray = (idx: number, col: number) => { // idx부터 col개의 행 return
		if (!modalSeat || !modalHall)
			return;

		const DOM = [];
		for (let i = 0; i < col; i++) {
			const seat_num = modalSeat[idx + i]?.seat_num;
			const type_code = modalSeat[idx + i]?.seat_type_code;
			if (idx + i >= modalHall.hall_row * modalHall.hall_col) // 존재해야할 좌석보다 많으면 없애기
				break;
			if (seat_num !== undefined && type_code !== undefined)
				DOM.push(<td className={clsx("seat", seatTypeCodeObj[Number(type_code)])} key={seat_num} onClick={() => handleSelectSeat(modalSeat[idx + i])}><div className={`${seat_num}`}>{seat_num}</div></td>);
		}

		return (
			<TableRow key={idx}>
				{DOM}
			</TableRow>
		)
	}

	const getSeatElement = (col: number) => { // 전체 좌석 return
		if (!modalSeat)
			return;

		const DOM = [];
		for (let i = 0; i < Object.keys(modalSeat).length; i++) {
			if (i % col === 0) {
				DOM.push(getSeatArray(i, col));
			}
		}

		return DOM;
	}

	const handleSelectSeat = (seat: SeatType | undefined) => { // 좌석 클릭 시 정보 저장하고 모달 띄우기
		if (!seat)
			return;
		setOpenSeatTypeModal(true);
		setSelectedSeat(seat.seat_num);
		setSeatType(seat.seat_type_code);
	}

	const handleSeatTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => { // modal에 있는 seat의 type 변경
		const code = event.target.value as string;
		setSeatType(code);
	}

	const getSeatTypeSelect = () => {
		const DOM = [];
		for (const code of seatTypeCode) {
			DOM.push(<MenuItem value={code.code_id}>{code.code_name}</MenuItem>)
		}

		return DOM;
	}

	const saveSeatType = () => {
		if (!modalHall)
			return;
		console.log(seatType);
		axios.put(`${SERVER_URL}/hall/seat`, {
			"seats": [
				{
					"hall_id": modalHall?.hall_id,
					"seat_num": selectedSeat,
					"seat_type_code": seatType
				}
			]
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				fetchSeat();
				setOpenSeatTypeModal(false);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	/* 상영관 추가 */
	const handleHallNameChange = (e: any) => { setHallName(e.target.value); }
	const handleHallColChange = (e: any) => {
		let str: string = e.target.value;
		if (str === "") { // 없으면 0으로 초기화
			setHallCol(0);
		}
		if (str.length === 2)
			str = str.slice(1);
		if (isNaN(Number(str))) {
			alert("숫자를 입력해주세요");
			return;
		}
		setHallCol(Number(str));
	}
	const handleHallRowChange = (e: any) => {
		let str: string = e.target.value;
		if (str === "") { // 없으면 0으로 초기화
			setHallRow(0);
		}
		if (str.length === 2)
			str = str.slice(1);
		if (isNaN(Number(str))) {
			alert("숫자를 입력해주세요");
			return;
		}
		setHallRow(Number(str));
	}

	const addHall = () => {
		// api 호출해서 hall 저장
		if (hallRow === 0 || hallCol === 0) {
			alert("행과 열은 적어도 1이어야 합니다.");
		}
		axios.post(`${SERVER_URL}/hall`, {
			"hall_name": hallName === "" ? null : hallName,
			"hall_row": hallRow,
			"hall_col": hallCol
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				fetchHall();
				setOpenAddHall(false);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<div>
			<PageTitle title="상영관 리스트 페이지" isButtonVisible={true} />
			<div className="hall-add-con">
				<Button variant="outlined" color="primary" onClick={() => { setOpenAddHall(true) }}>상영관 추가</Button>
			</div>
			<div className="hall-list-con">
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className="table-title">번호</TableCell>
								<TableCell className="table-title">상영관 이름</TableCell>
								<TableCell className="table-title">상영관 행, 열</TableCell>
								<TableCell className="table-title">수정</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								halls &&
								Object.keys(halls).map((hall_id: string, index: number) => {
									const hall = halls[Number(hall_id)];
									if (hall === undefined)
										return null;
									return (
										<TableRow key={hall.hall_id}>
											<TableCell className="table-content">{index + 1}</TableCell>
											<TableCell className="table-content">
												<TextField className="hall-name" placeholder="상영관 이름" value={hall.hall_name} onChange={(e: any) => handleNameChange(e, hall.hall_id)} />
												<Button variant="contained" color="secondary" onClick={() => saveHallName(hall.hall_id)}>상영관 이름 수정</Button>
											</TableCell>
											<TableCell className="table-content">
												<span>{`${hall.hall_row}행`}</span>
												<span>{`${hall.hall_col}열`}</span>
											</TableCell>
											<TableCell className="table-content">
												<Button variant="contained" color="primary" onClick={() => handleSeatModal(hall.hall_id)}>좌석 수정</Button>
												<Button variant="contained" color="secondary" onClick={() => removeHall(hall.hall_id)}>상영관 삭제</Button>
											</TableCell>
										</TableRow>
									);
								})
							}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			{
				modalHall &&
				<ModalComponent
					open={openSeatModal}
					setOpen={setOpenSeatModal}
					title="상영관 좌석 수정"
					button="저장"
					buttonOnClick={() => saveSeat()}
				>
					<div className="seat-map">
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										{
											getColArray(modalHall.hall_col).map((index: number) => (
												<TableCell key={index}>{index}</TableCell>
											))
										}
									</TableRow>
								</TableHead>
								<TableBody>
									{
										getSeatElement(modalHall.hall_col)
									}
								</TableBody>
							</Table>
						</TableContainer>
						<div className="seat-info-con">

						</div>
					</div>
				</ModalComponent>
			}
			{
				selectedSeat !== -1 &&
				<ModalComponent
					open={openSeatTypeModal}
					setOpen={setOpenSeatTypeModal}
					title="좌석 정보 수정"
					button="저장"
					buttonOnClick={() => saveSeatType()}
				>
					<div className="seat-modify-modal">
						<FormControl>
							<InputLabel className="seat-type-label" id="select-label">좌석 종류</InputLabel>
							<Select
								labelId="select-label"
								value={seatType}
								onChange={handleSeatTypeChange}
							>
								{
									getSeatTypeSelect()
								}
							</Select>
						</FormControl>
					</div>
				</ModalComponent>
			}
			{
				openAddHall &&
				<ModalComponent
					open={openAddHall}
					setOpen={setOpenAddHall}
					title="상영관 추가"
					button="추가"
					buttonOnClick={addHall}
				>
					<div className="add-container">
						<div className="add-hall-input-con">
							<TextField
								variant="outlined"
								placeholder="상영관 이름"
								label="상영관 이름"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 50 }}
								helperText="이름을 입력하지 않으면 자동 할당됩니다."
								value={hallName}
								onChange={handleHallNameChange}
							/>
							<TextField
								variant="outlined"
								placeholder="행"
								label="행"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 2 }}
								value={hallCol}
								onChange={handleHallColChange}
							/>
							<TextField
								variant="outlined"
								placeholder="열"
								label="열"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 2 }}
								value={hallRow}
								onChange={handleHallRowChange}
							/>
						</div>
					</div>
				</ModalComponent>
			}
		</div>
	);
}

export default AdminHall;