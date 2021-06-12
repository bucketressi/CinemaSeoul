import React, { Dispatch, useEffect, useState } from 'react';
import clsx from 'clsx';

import { ShowScheduleType, BookSeatType, CodeMatch } from '../../Main/Type';
import { getDateString } from '../../Function';

import { Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@material-ui/core';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useSeatTypeCodeState } from '../../Main/CodeModel';
import { useTokenState } from '../../Main/TokenModel';
import { useUserState } from '../../Main/UserModel';
import { useHistory } from 'react-router';
import { PageTitle } from '../../Components';

type Props = {
	mode: number;
	setMode: Dispatch<number>;
	scheduleInfo: ShowScheduleType;
	payPrice: number;
	setPayPrice: Dispatch<number>;
	seatNum: number[];
	setSeatNum: Dispatch<number[]>;
	seatTypeNum: number[];
	setSeatTypeNum: Dispatch<number[]>;
	seatList: BookSeatType[] | undefined;
	setSeatList: Dispatch<BookSeatType[]>;
	disabledSeat: number;
	setDisabledSeat: Dispatch<number>;
};

const BookSeat = ({ mode, setMode, scheduleInfo, payPrice, setPayPrice, seatNum, setSeatNum, seatTypeNum, setSeatTypeNum, seatList, setSeatList, disabledSeat, setDisabledSeat }: Props) => {
	const history = useHistory();
	const AUTH_TOKEN = useTokenState();
	const user = useUserState();
	const seatTypeCode = useSeatTypeCodeState();
	const [seatTypeCodeObj, setSeatTypeCodeObj] = useState<CodeMatch>({});

	const [blackMode, setBlackMode] = useState<boolean>(false);
	const [hallCol, setHallCol] = useState<number>(0);
	const [hallRow, setHallRow] = useState<number>(0);
	const [bookedSeat, setBookedSeat] = useState<number[]>([]); // 이미 예매된 좌석 저장

	/* 각 좌석 선택 */
	const [seatTotalNum, setSeatTotalNum] = useState<number>(0); // 좌석 수 합 저장

	useEffect(() => {
		let sum = 0;
		seatNum.forEach((num: number) => { sum += num; })
		setSeatTotalNum(sum);
	}, [seatNum]);

	useEffect(() => {
		if (seatTotalNum <= seatTypeNum.length) {
			// 좌석 수를 모두 소모!
			setBlackMode(true);
			calculatePayPrice();
		} else {
			setBlackMode(false);
		}
	}, [seatTypeNum, seatTotalNum]);

	useEffect(() => {
		if (mode === 1)
			fetchBookSeat();
	}, [mode]);

	useEffect(() => {
		const obj: CodeMatch = {};
		seatTypeCode.forEach((code) => {
			obj[Number(code.code_id)] = code.code_name;
		})
		setSeatTypeCodeObj(obj);
	}, [seatTypeCode]);

	const fetchBookSeat = () => { // 좌석 받아오기
		axios.get(`${SERVER_URL}/book/${scheduleInfo.show_id}/seat`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data || !res.data.seat_list)
					return;
				setSeatList(res.data.seat_list);
				setHallCol(res.data.hall_col);
				setHallRow(res.data.hall_row);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const getEndTimeString = (end_time: string) => {
		const arr = end_time.split("/");
		return arr[0] + "-" + arr[1] + "-" + arr[2];
	}

	const setSeatNumAboutType = (index: number, num: number) => { // 좌석 개수 setting
		if (!seatNum)
			return;
		const newSeatTotal = seatTotalNum - seatNum[index] + num; 
		if (newSeatTotal > 8) {
			alert("최대 8개의 좌석을 예매하실 수 있습니다.");
			return;
		}else if(newSeatTotal < seatTypeNum.length){
			alert("현재 선택된 좌석이 더 많습니다. 현재 선택된 좌석을 먼저 해지해주세요.");
			return;
		}
		const arr = seatNum.slice();
		arr[index] = num;
		setSeatNum(arr);
	}

	const calculatePayPrice = () => {
		let price = 0;
		price += (seatNum[0] * 12000);
		price += (seatNum[1] * 9000);
		price += (seatNum[2] * 5000);
		price += (seatNum[3] * 5000);
		setPayPrice(price);
	}

	const gotoPay = () => { // 결제로 가기
		if(seatTotalNum === 0){
			// 좌석 수를 선택하지 않았으면
			alert("인원을 선택해주세요.");
			return;
		}
		if (seatTotalNum !== seatTypeNum.length) {
			// 모든 좌석 클릭하지 않았으면
			alert("입력한 좌석 수에 맞는 모든 좌석을 선택해주세요.");
			return;
		}
		setMode(2);
		calculatePayPrice();
	}

	/* 좌석 표현 */
	const getColArray = () => {
		const arr = [];
		for (let i = 1; i <= hallCol; i++) {
			arr.push(i);
		}
		return arr;
	}

	const getSeatArray = (idx: number) => { // idx부터 col개의 행 return
		if (!seatList || !seatList[idx])
			return;

		const DOM = [];
		const booked = [];
		for (let i = 0; i < hallCol; i++) {
			const seat_num = seatList[idx + i].seat_num;
			const type_code = seatList[idx + i].seat_type;
			const isBooked = seatList[idx + i].booked;
			const bool = seatTypeNum.includes(seat_num);
			if(isBooked){
				booked.push(seat_num);
			}

			DOM.push(<td className={clsx("seat", seatTypeCodeObj[Number(type_code)], bool ? "selected" : "", blackMode || isBooked ? "불가" : "")} key={seat_num} onClick={() => { if(isBooked){alert("이미 예매된 좌석입니다."); return;} handleSelectSeat(seatList[idx + i]);}}><div className={`${seat_num}`}>{seat_num}</div></td>);
		}

		return (
			<TableRow key={idx}>
				{DOM}
			</TableRow>
		)
	}

	const getSeatElement = () => { // 전체 좌석 return
		if (!seatList)
			return;

		const DOM = [];
		for (let i = 0; i < Object.keys(seatList).length; i++) {
			if (i % hallCol === 0) {
				DOM.push(getSeatArray(i));
			}
		}

		return DOM;
	}

	const handleSelectSeat = (seat: BookSeatType) => {
		// 예매된 좌석, 불가 좌석, 거리두기 좌석 => 예매 x 클릭도 x
		// 장애인 석 => 장애인 석의 개수가 남았으면 예매 가능
		// 일반 석 => 개수가 남았으면 예매 가능 (blackmode가 아니면)

		const arr = seatTypeNum.slice();
		const type = seatTypeCodeObj[Number(seat.seat_type)];
		switch (type) {
		case "불가":
		case "거리두기":
			return;
		case "장애인석":
			if (arr.includes(seat.seat_num)) { // 이미 포함되어 있는 좌석은 해지
				arr.splice(arr.findIndex((s) => s === seat.seat_num), 1);
				setSeatTypeNum(arr);
				setDisabledSeat(disabledSeat -1); // 장애인 석 수도 1 감소
				return;
			}
			if (blackMode) // blackMode이면 모두 선택했으므로 더이상 선택하지 못함
				return;
			if (disabledSeat >= seatNum[3]) {// 장애인석이 마감되었으면
				console.log(disabledSeat, seatNum[3]);
				alert("선택된 장애인석 수만큼만 장애인 전용 좌석이 선택 가능합니다.");
				return;
			}
			setDisabledSeat(disabledSeat + 1);
			arr.push(seat.seat_num);
			setSeatTypeNum(arr);
			return;
		case "일반":
			if (arr.includes(seat.seat_num)) { // 이미 포함되어 있는 좌석은 해지
				arr.splice(arr.findIndex((s) => s === seat.seat_num), 1);
				setSeatTypeNum(arr);
				return;
			}
			if (blackMode) // blackMode이면 모두 선택했으므로 더이상 선택하지 못함
				return;
			if(bookedSeat.includes(seat.seat_num)) // 이미 예매되어 있는 좌석은 불가
				return;
			arr.push(seat.seat_num);
			setSeatTypeNum(arr);
			return;
		}
	}

	return (
		<div>
			<PageTitle
				title="예매 좌석 선택"
				isButtonVisible={true}
			/>
			<div className="bookseat-con">
				<div className="bookseat-header">
					<div className="select-con">
						<div className="schedule-info-con">
							<div>
								<div className="movie-name">{scheduleInfo.movi_name}</div>
								<div>
									<div>{getDateString(scheduleInfo.show_date)} ~ {getEndTimeString(scheduleInfo.end_time)}</div>
								</div>
								<div>
									{scheduleInfo.hall_name}
								</div>
							</div>
						</div>
						<div className="seat-select-con">
							{
								["성인", "청소년", "시니어", "장애인"].map((type: string, index: number) =>
									<div key={index}>
										<div>{type} 수</div>
										<Select
											value={seatNum[index]}
											onChange={(e: any) => { setSeatNumAboutType(index, e.target.value) }}
										>
											{
												[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num: number) => <MenuItem key={num} value={num}>{num}명</MenuItem>)
											}
										</Select>
									</div>
								)
							}
						</div>
					</div>
					<div className="information">
						<p>입장 전 전자출입명부 작성 및 관람 중 마스크 착용 필수, 예매 시 동반자 외 띄어앉기를 준수하여 주시기 바랍니다.(1인 예매 시 타일행과의 관람에 유의해 주세요)</p>
					</div>
					<div className="select-seat-num">
						<div className="seat-map">
							<TableContainer>
								<Table>
									<TableHead>
										<TableRow>
											{
												getColArray().map((index: number) => (
													<TableCell key={index}>{index}</TableCell>
												))
											}
										</TableRow>
									</TableHead>
									<TableBody>
										{
											seatList &&
											getSeatElement()
										}
									</TableBody>
								</Table>
							</TableContainer>
							<div className="seat-info-con">
								{
									seatTypeCode.map((seat) => {
										return (
											<div key={seat.code_id}>
												<div className={clsx("seat-shape", seat.code_name)} />
												<div className="seat-type">{seat.code_name}</div>
											</div>
										);
									})
								}
							</div>
						</div>
					</div>
					<div className="result-con">
						<div className="total-price">
							<div>총 결제 액</div>
							<div>{payPrice}원</div>
						</div>
						<div className="pay-btn">
							<Button variant="contained" color="primary" onClick={gotoPay}>결제하러 가기</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BookSeat;