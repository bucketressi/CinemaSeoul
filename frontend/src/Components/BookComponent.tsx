import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TextField, Button } from '@material-ui/core';

import {getDateString} from '../Function';
import { useUserState } from '../Main/UserModel';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import { SERVER_URL } from '../CommonVariable';
import { errorHandler } from '../Main/ErrorHandler';
import { useTokenState } from '../Main/TokenModel';
import { UserBookType, UserBookExactType } from '../Main/Type';
import { ModalComponent } from '../Components';
import { Pagination } from '@material-ui/lab';

type Props = {
	mode?: number
}

const BookComponent = ({ mode }: Props) => {
	const userId = useUserState();
	const AUTH_TOKEN = useTokenState();
	const history = useHistory();

	const [page, setPage] = useState<number>(1);
	const [totalPage, setTotalPage] = useState<number>(1);

	const handlePageChange = (e: any, pageNumber: number) => { setPage(pageNumber); };

	/* 예매 */
	const [bookInfo, setBookInfo] = useState<UserBookType[] | undefined>(undefined); // 예매 정보
	const [openBookModal, setOpenBookModal] = useState<boolean>(false); // 예매 모달
	const [selectedBookId, setSelectedBookId] = useState<number>(-1); // 선택된 예매
	const [bookExactInfo, setBookExactInfo] = useState<UserBookExactType | undefined>(undefined); // 예매 상세 정보
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");

	useEffect(() => {
		fetchUserBookList();
	}, [page]);

	useEffect(() => {
		if (mode !== 0)
			return;
		// 예매 내역 조회
		fetchUserBookList();
	}, [mode]);

	useEffect(() => {
		fetchUserExactBookInfo();
	}, [selectedBookId]);

	const fetchUserBookList = () => {
		axios.post(`${SERVER_URL}/book/list`, {
			user_id: userId,     //회원은 강제로 본인으로 바뀝니다.
			start_date: startDate ==="" ? null : startDate, // 없으면 전체, 있으면 할당
			end_date: endDate==="" ? null : endDate, // 없으면 전체, 있으면 할당
			page: page,
			amount: 10
		}, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data || !res.data.bookrecord_list)
					return;
				setBookInfo(res.data.bookrecord_list);
				setTotalPage(res.data.totalpage);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const fetchUserExactBookInfo = () => {
		if (selectedBookId === -1)
			return;

		axios.get(`${SERVER_URL}/book/${selectedBookId}`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data)
					return;
				setBookExactInfo(res.data);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const openUserBookModal = (book_id: number) => {
		setOpenBookModal(true); // 예매 모달 열기
		setSelectedBookId(book_id);
	}

	return (
		<div className="user-book-con">
			<div className="select-date-con">
				<div>상영일자별 검색</div>
				<TextField
					type="date"
					label="시작일자"
					value={getDateString(startDate)}
					InputLabelProps={{
						shrink: true
					}}
					onChange={(e: any) => setStartDate(e.target.value.split('-').join(''))}
				/>
				<TextField
					type="date"
					label="종료일자"
					value={getDateString(endDate)}
					InputLabelProps={{
						shrink: true
					}}
					onChange={(e: any) => setEndDate(e.target.value.split('-').join(''))}
				/>
				<Button variant="contained" color="primary" onClick={() => fetchUserBookList()}>검색</Button>
			</div>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>예매자</TableCell>
							<TableCell>상영관</TableCell>
							<TableCell>영화</TableCell>
							<TableCell>상영 일자</TableCell>
							<TableCell>예매 날짜</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							bookInfo &&
							bookInfo.map((book: UserBookType) => {
								// 각 row는 cursor: pointer로 클릭하도록 유도
								return (
									<TableRow onClick={() => openUserBookModal(book.book_id)} key={book.book_id}>
										<TableCell>{book.user_name}</TableCell>
										<TableCell>{book.hall_name}</TableCell>
										<TableCell>{book.movi_name}</TableCell>
										<TableCell>{`${getDateString(book.show_date)} ${book.show_time.substr(0,2)}:${book.show_time.substr(2,4)}`}</TableCell>
										<TableCell>{book.book_datetime}</TableCell>
									</TableRow>
								);
							})
						}
					</TableBody>
				</Table>
			</TableContainer>
			<Pagination className="pagination" count={totalPage} page={page} onChange={handlePageChange} />
			{
				bookExactInfo &&
				<ModalComponent
					open={openBookModal}
					setOpen={setOpenBookModal}
					title="예매 상세 조회"
				>
					<div className="book-exact-modal">
						<div><span>예매자</span><p>{bookExactInfo.user_name}</p></div>
						<div><span>성인 좌석 수</span><p>{bookExactInfo.adult}석</p></div>
						<div><span>청소년 좌석 수</span><p>{bookExactInfo.teen}석</p></div>
						<div><span>시니어 좌석 수</span><p>{bookExactInfo.senior}석</p></div>
						<div><span>장애인 좌석 수</span><p>{bookExactInfo.impaired}석</p></div>
						<div><span>예매일자</span><p>{bookExactInfo.book_datetime}</p></div>
						<div><span>상영일자</span><p>{getDateString(bookExactInfo.show_date)} {bookExactInfo.show_time.substr(0,2)+":"+bookExactInfo.show_time.substr(2,2)}</p></div>
						<div><span>영화</span><p>{bookExactInfo.movi_name}</p></div>
						<div><span>런타임</span><p>{bookExactInfo.run_time}</p></div>
						<div><span>상영관</span><p>{bookExactInfo.hall_name}</p></div>
						<div><span>좌석</span><p>{bookExactInfo.seat_num.join(",")}</p></div>
						<div><span>사용코드</span><p>{bookExactInfo.use_code}</p></div>
						{
							bookExactInfo.use_datetime &&
								<div><span>관람일자</span><p>{bookExactInfo.use_datetime}</p></div>
						}
					</div>
				</ModalComponent>
			}
		</div>
	)
}

export default BookComponent;