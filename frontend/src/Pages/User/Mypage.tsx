import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TextField, Button } from '@material-ui/core';
import { ModalComponent, PageTitle } from '../../Components';
import {getDateString} from '../../Function';
import "../../scss/pages/mypage.scss";

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenDispatch, useTokenState } from '../../Main/TokenModel';
import { useUserState } from '../../Main/UserModel';
import { useHistory } from 'react-router-dom';
import { MypageUserType, UserBookType, UserBookExactType } from '../../Main/Type';

const Mypage = () => {
	const userId = useUserState();
	const AUTH_TOKEN = useTokenState();
	const history = useHistory();
	const [mode, setMode] = useState<number>(0); // 0 : 결제내역조회, 1 : 내가 본 영화, 2 : 1:1문의, 3 : 정보 관리

	const [userInfo, setUserInfo] = useState<MypageUserType | undefined>(undefined); // user 전체 정보
	/* 예매 */
	const [bookInfo, setBookInfo] = useState<UserBookType[] | undefined>(undefined); // 예매 정보
	const [openBookModal, setOpenBookModal] = useState<boolean>(false); // 예매 모달
	const [selectedBookId, setSelectedBookId] = useState<number>(-1); // 선택된 예매
	const [bookExactInfo, setBookExactInfo] = useState<UserBookExactType | undefined>(undefined); // 예매 상세 정보
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");


	useEffect(() => { // 탭 바뀔 때마다 정보 받아오기
		switch (mode) {
		case 0:
			// 예매 내역 조회
			fetchUserBookList();
			return;
		}
	}, [mode]);

	useEffect(() => { // 로그인 된 유저만 마이페이지 가능, 유저 정보 받아오기
		if (userId === undefined) {
			alert("로그인 후 이용 가능합니다.")
			history.push("/login");
		}
		fetchUserInfo();
	}, []);

	const fetchUserInfo = () => {
		axios.get(`${SERVER_URL}/user/${userId}`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				setUserInfo(res.data);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	/* 예매 내역 조회 */

	useEffect(() => {
		fetchUserExactBookInfo();
	}, [selectedBookId]);

	const fetchUserBookList = () => {
		axios.post(`${SERVER_URL}/book/list`, {
			user_id: userId,     //회원은 강제로 본인으로 바뀝니다.
			start_date: startDate==="" ? null : startDate, // 없으면 전체, 있으면 할당
			end_date: endDate==="" ? null : endDate, // 없으면 전체, 있으면 할당
			page: 1
		}, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data || !res.data.bookrecord_list)
					return;
				setBookInfo(res.data.bookrecord_list);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const fetchUserExactBookInfo = () => {
		if(selectedBookId === -1)
			return;

		axios.get(`${SERVER_URL}/book/${selectedBookId}`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				if(!res.data)
					return;
				setBookExactInfo(res.data);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const handleModeChange = (e: any, newValue: number) => {
		setMode(newValue);
	}

	const openUserBookModal = (book_id : number) => {
		setOpenBookModal(true); // 예매 모달 열기
		setSelectedBookId(book_id);
	}

	/* 결제 내역 조회 */


	return (
		<div>
			<PageTitle
				title="마이페이지"
				isButtonVisible={false}
			/>
			{
				userInfo &&
				<div className="mypage-con">
					<div className="pointer-con">
						<div>
							현재 포인트 : {userInfo?.curr_point}포인트
						</div>
						<div>
							누적 포인트 : {userInfo?.accu_point}포인트
						</div>
					</div>
					<Tabs
						value={mode}
						onChange={handleModeChange}
						className="book-tab"
						indicatorColor="primary"
					>
						<Tab label="예매내역조회" />
						<Tab label="결제내역조회" />
						<Tab label="내가 본 영화" />
						<Tab label="1:1 문의" />
						<Tab label="정보 관리" />
					</Tabs>
					<div className="content-con">
						<div
							role="tabpanel"
							hidden={mode !== 0}
						>
							{
								bookInfo &&
								<div className="user-book-con">
									<div className="select-date-con">
										<TextField
											type="date"
											label="시작일자"
											value={getDateString(startDate)}
											InputLabelProps={{
												shrink:true
											}}
											onChange={(e: any) => setStartDate(e.target.value.split('-').join(''))}
										/>
										<TextField
											type="date"
											label="종료일자"
											value={getDateString(endDate)}
											InputLabelProps={{
												shrink:true
											}}
											onChange={(e: any) => setEndDate(e.target.value.split('-').join(''))}
										/>
										<Button variant="contained" color="primary" onClick={() => fetchUserBookList()}>검색</Button>
									</div>
									<TableContainer>
										<Table>
											<TableHead>
												<TableRow>
													<TableCell>상영관</TableCell>
													<TableCell>영화</TableCell>
													<TableCell>상영 일자</TableCell>
													<TableCell>예매 날짜</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{bookInfo.map((book: UserBookType) => {
													// 각 row는 cursor: pointer로 클릭하도록 유도
													return (
														<TableRow key={book.book_id} onClick={() => openUserBookModal(book.book_id)}>
															<TableCell>{book.hall_name}</TableCell>
															<TableCell>{book.movi_name}</TableCell>
															<TableCell>{book.show_date} {book.show_time}</TableCell>
															<TableCell>{book.book_datetime}</TableCell>
														</TableRow>
													);
												})}
											</TableBody>
										</Table>
									</TableContainer>
								</div>
							}
						</div>
						<div
							role="tabpanel"
							hidden={mode !== 1}
						>
							1
						</div>
						<div
							role="tabpanel"
							hidden={mode !== 2}
						>
							2
						</div>
						<div
							role="tabpanel"
							hidden={mode !== 3}
						>
							3
						</div>
						<div
							role="tabpanel"
							hidden={mode !== 4}
						>
							4
						</div>
					</div>
				</div>
			}
			{
				bookExactInfo &&
				<ModalComponent
					open ={openBookModal}
					setOpen = {setOpenBookModal}
					title="예매 상세 조회"
				>
					<div>
						<div>예매자 : {bookExactInfo.user_name}</div>
						<div>성인 좌석 수 : {bookExactInfo.adult}</div>
						<div>청소년 좌석 수 : {bookExactInfo.teen}</div>
						<div>시니어 좌석 수 : {bookExactInfo.senior}</div>
						<div>장애인 좌석 수 : {bookExactInfo.impaired}</div>
						<div>예매일자 : {bookExactInfo.book_datetime}</div>
						<div>상영일자 : {bookExactInfo.show_date} {bookExactInfo.show_time}</div>
						<div>영화 : {bookExactInfo.movi_name}</div>
						<div>런타임 : {bookExactInfo.run_time}</div>
						<div>상영관 : {bookExactInfo.hall_name}</div>
						<div>좌석 : {bookExactInfo.seat_num.map(seat => <span key={seat}>{seat}</span>)}</div>
						<div>사용코드 : {bookExactInfo.use_code}</div>
						<div>관람일자 : {bookExactInfo.use_datetime}</div>
						{/* 관람일자는 없으면 표시 x */}
					</div>
				</ModalComponent>
			}
		</div>
	);
}

export default Mypage;