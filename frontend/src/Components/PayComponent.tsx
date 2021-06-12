import React, { useEffect, useState } from 'react';

import { getDateString } from '../Function';
import { CodeMatch, CodeType, UserBookPayType, UserProductPayType } from '../Main/Type';
import { usePayStateCodeState } from '../Main/CodeModel';

import axios from 'axios';
import { SERVER_URL } from '../CommonVariable';
import { errorHandler } from '../Main/ErrorHandler';
import { useTokenState } from '../Main/TokenModel';
import { Button, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField } from '@material-ui/core';
import { useUserState } from '../Main/UserModel';
import { Pagination } from '@material-ui/lab';

type Props = {
	mode?: number
}

const PayComponent = ({ mode }: Props) => {
	const payStateCode = usePayStateCodeState();
	const userId = useUserState();
	const AUTH_TOKEN = useTokenState();
	const [payStateCodeObj, setPayStateCodeObj] = useState<CodeMatch>({});

	const [payMode, setPayMode] = useState<number>(0); // 0 : 예매 결제, 1: 상품 결제

	/* 페이지네이션 */
	const [page, setPage] = useState<number>(1);
	const [totalPage, setTotalPage] = useState<number>(1);

	const handlePageChange = (e: any, pageNumber: number) => { setPage(pageNumber); };

	/* 날짜 */
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");

	/* 정보 저장 */
	const [bookPayInfo, setBookPayInfo] = useState<UserBookPayType[] | undefined>(undefined);
	const [productPayInfo, setProductPayInfo] = useState<UserProductPayType[] | undefined>(undefined);
	
	useEffect(() => {
		fetchFromMode();
	}, [page]);

	useEffect(() => {
		const obj: CodeMatch = {};
		payStateCode.forEach((code: CodeType) => {
			obj[Number(code.code_id)] = code.code_name;
		});
		setPayStateCodeObj(obj);
	}, [payStateCode]);

	useEffect(() => {
		setPage(1); // page 1번 띄우기
		fetchFromMode();
	}, [payMode]);

	const handleModeChange = (e: any, newValue: number) => {
		setPayMode(newValue);
	}

	/* 정보 받아오기 */
	const fetchFromMode = () => {
		if (payMode) {
			fetchUserProductPayList();
		} else {
			fetchUserBookPayList();
		}
	}

	const fetchUserBookPayList = () => {
		axios.post(`${SERVER_URL}/pay/book/list`, {
			"page": page,
			"amount": 5,
			"user_id": userId,//145,
			"start_date": startDate === "" ? null : startDate,
			"end_date": endDate === "" ? null : endDate,
		}, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data || !res.data.bookpayinfo)
					return;
				setBookPayInfo(res.data.bookpayinfo);
				setTotalPage(res.data.totalpage);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const fetchUserProductPayList = () => {
		axios.post(`${SERVER_URL}/pay/product/list`, {
			"page": page,
			"amount": 5,
			"user_id": userId,//145,
			"start_date": startDate === "" ? null : startDate,
			"end_date": endDate === "" ? null : endDate,
		}, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data || !res.data.prodpayinfo)
					return;
				setProductPayInfo(res.data.prodpayinfo);
				setTotalPage(res.data.totalpage);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	/* 코드 사용 */
	const usePayCode = (use_code: string) => {
		if (!confirm("사용하시겠습니까? 사용한 내역은 돌이킬 수 없습니다."))
			return;

		axios.post(`${SERVER_URL}/pay/use/book`, {
			"use_code": use_code
		}, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("사용 완료 되었습니다.")
				fetchUserBookPayList();
			})
			.catch((e) => {
				errorHandler(e, true, ["", "이미 사용된 코드입니다.", "", "지난 내역은 사용할 수 없습니다."]);
			});

	}
	const useProductCode = (use_code: string) => {
		if (!confirm("사용하시겠습니까? 사용한 내역은 돌이킬 수 없습니다."))
			return;

		axios.post(`${SERVER_URL}/pay/use/product`, {
			"use_code": use_code
		}, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("사용 완료 되었습니다.")
				fetchUserProductPayList();
			})
			.catch((e) => {
				errorHandler(e, true, ["", "이미 사용된 코드입니다."]);
			});
	}

	const getTableHeader = () => (
		<TableHead>
			<TableRow>
				<TableCell>번호</TableCell>
				<TableCell>결제 내용</TableCell>
				<TableCell>결제 정보</TableCell>
				<TableCell>결제 상태</TableCell>
				<TableCell>결제 취소</TableCell>
				<TableCell>사용 정보</TableCell>
			</TableRow>
		</TableHead>
	);

	const cancelBookPay = (book_pay_id: number) => {
		if (!confirm("정말 해당 예매를 취소하시겠습니까? 예매 티켓도 함께 취소됩니다."))
			return;
		axios.delete(`${SERVER_URL}/book/cancel/${book_pay_id}`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("성공적으로 취소되었습니다.");
				fetchUserBookPayList();
			})
			.catch((e) => {
				errorHandler(e, true, ["", "이미 사용되어 취소할 수 없습니다.", "", "이미 취소된 결제입니다."]);
			});
	}

	const cancelProductPay = (prod_pay_id: number) => {
		if (!confirm("정말 해당 상품 결제를 취소하시겠습니까?"))
			return;
		axios.delete(`${SERVER_URL}/product/cancel/${prod_pay_id}`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("성공적으로 취소되었습니다.");
				fetchUserProductPayList();
			})
			.catch((e) => {
				errorHandler(e, true, ["", "이미 사용되어 취소할 수 없습니다.", "", "이미 취소된 결제입니다."]);
			});
	}
	return (
		<div className="user-pay-con">
			<div className="select-date-con">
				<div>결제 일자 별 검색</div>
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
				<Button variant="contained" color="primary" onClick={fetchFromMode}>검색</Button>
			</div>
			<div>
				<Tabs
					value={payMode}
					onChange={handleModeChange}
					className="pay-tab"
					indicatorColor="primary"
				>
					<Tab label="예매결제조회" />
					<Tab label="상품결제조회" />
				</Tabs>
				<div
					role="tabpanel"
					hidden={payMode !== 0}
				>
					{/* 예매 */}
					{
						bookPayInfo &&
						<TableContainer>
							<Table>
								{getTableHeader()}
								<TableBody>
									{
										bookPayInfo.map((book: UserBookPayType, index: number) => {
											return (
												<TableRow key={book.book_pay_id}>
													<TableCell>{index+1}</TableCell>
													<TableCell>
														{
															!book.book_id ?
																<div>정보가 없습니다.</div> :
																<div>
																	<div>영화 : {book.movi_name}</div>
																	<div>상영일자: {book.show_date} {book.show_time}</div>
																</div>
														}
													</TableCell>
													<TableCell>
														<div>
															<div>결제 가격 : {book.price}</div>
															<div>결제 종류 : {book.pay_type}</div>
															<div>결제 일자 : {book.pay_datetime}</div>
															<div>사용 포인트 : {book.use_point}</div>
															<div>적립 포인트 : {book.accu_point}</div>
														</div>
													</TableCell>
													<TableCell>
														{
															book.use_datetime !== null ?
																<Button variant="contained" color="default">이미 사용됨</Button>
																: payStateCodeObj[Number(book.pay_state_code)] === "결제완료" ?
																	<Button variant="contained" color="primary" onClick={() => usePayCode(book.use_code)}>사용하기</Button> :
																	<Button variant="contained" color="default">결제 취소됨</Button>
														}
													</TableCell>
													<TableCell>
														{
															payStateCodeObj[Number(book.pay_state_code)] === "결제완료" ?
																<Button variant="contained" color="secondary" onClick={() => cancelBookPay(book.book_pay_id)}>예매 취소</Button> :
																<Button variant="contained" color="default">결제 취소 불가</Button>
														}
													</TableCell>
													<TableCell>
														<div>
															<div>사용 일자 : {book.use_datetime}</div>
															<div>사용 코드 : {book.use_code}</div>
														</div>
													</TableCell>
												</TableRow>
											);
										})
									}
								</TableBody>
							</Table>
							<Pagination className="pagination" count={totalPage} page={page} onChange={handlePageChange} />
						</TableContainer>
					}
				</div>
				<div
					role="tabpanel"
					hidden={payMode !== 1}
				>
					{/* 상품 */}
					{
						productPayInfo &&
						<TableContainer>
							<Table>
								{getTableHeader()}
								<TableBody>
									{
										productPayInfo.map((product: UserProductPayType, index: number) => {
											return (
												<TableRow key={product.prod_pay_id}>
													<TableCell>{index+1}</TableCell>
													<TableCell>
														{
															product.productPayDetails.map((product) => (
																<div key={product.prod_id}>
																	<div>{product.prod_name}</div>
																	<div>{product.price}원 * {product.amount}개 = {product.price*product.amount}원</div>
																</div>
															))
														}
													</TableCell>
													<TableCell>
														<div>
															<div>결제 가격 : {product.price}</div>
															<div>결제 종류 : {product.pay_type}</div>
															<div>결제 일자 : {product.pay_datetime}</div>
															<div>사용 포인트 : {product.use_point}</div>
															<div>적립 포인트 : {product.accu_point}</div>
														</div>
													</TableCell>
													<TableCell>
														{
															product.use_datetime !== null ?
																<Button variant="contained" color="default">이미 사용됨</Button>
																: payStateCodeObj[Number(product.pay_state_code)] === "결제완료" ?
																	<Button variant="contained" color="primary" onClick={() => useProductCode(product.use_code)}>사용하기</Button> :
																	<Button variant="contained" color="default">결제 취소됨</Button>
														}
													</TableCell>
													<TableCell>
														{
															payStateCodeObj[Number(product.pay_state_code)] === "결제완료" ?
																<Button variant="contained" color="secondary" onClick={() => cancelProductPay(product.prod_pay_id)}>결제 취소</Button> :
																<Button variant="contained" color="default">결제 취소 불가</Button>
														}
													</TableCell>
													<TableCell>
														<div>
															<div>사용 일자 : {product.use_datetime}</div>
															<div>사용 코드 : {product.use_code}</div>
														</div>
													</TableCell>
												</TableRow>
											);
										})
									}
								</TableBody>
							</Table>
							<Pagination className="pagination" count={totalPage} page={page} onChange={handlePageChange} />
						</TableContainer>
					}
				</div>
			</div>
		</div>
	);
}

export default PayComponent;