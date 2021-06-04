import React, { useEffect, useState } from 'react';
import { BookShowScheduleType, AbleMovieType, ShowScheduleType, BookSeatType } from '../../Main/Type';
import { BookSchedule, BookSeat, BookPay } from '.';
import { PageTitle } from '../../Components';

import axios from 'axios';
import { Tabs, Tab } from '@material-ui/core';
import { SERVER_URL } from '../../CommonVariable';
import { useUserState } from '../../Main/UserModel';
import { useTokenState } from '../../Main/TokenModel';
import { errorHandler } from '../../Main/ErrorHandler';
import { useHistory } from 'react-router';
import "../../scss/pages/book.scss";

const Book = () => {
	const AUTH_TOKEN = useTokenState();
	const user = useUserState();
	const history = useHistory();
	const [mode, setMode] = useState<number>(0); // 0 : 상영일정 선택, 1: 좌석 선택, 2 : 결제
	const [resultSchedule, setResultSchedule] = useState<BookShowScheduleType[] | undefined>(undefined); // 선택할 수 있는 상영일정 저장
	const [selectedSchedule, setSelectedSchedule] = useState<number>(-1); // 선택된 상영일정 id 저장
	const [scheduleInfo, setScheduleInfo] = useState<ShowScheduleType| undefined>(undefined); // 선택된 상영일정 세부 정보 저장
	const [payPrice, setPayPrice] = useState<number>(0); 
	const [seatNum, setSeatNum] = useState<number[]>([0,0,0,0]); // 각 종류별 좌석 개수 저장 => 성인, 청소년, 시니어, 장애인
	const [seatTypeNum, setSeatTypeNum] = useState<number[]>([]); // 저장된 좌석
	const [seatList, setSeatList] = useState<BookSeatType[] | undefined>(undefined); // 선택할 수 있는 좌석 목록
	const [disabledSeat, setDisabledSeat] = useState<number>(0); // 장애인 좌석 수 저장

	useEffect(() => {
		if(user === undefined){
			alert("로그인 후 예매하실 수 있습니다.");
			history.push("/login");
		}
	}, []);

	useEffect(() => {
		// 선택된 상영일정이 바뀌면 상영일정 세부 정보 받아오기
		fetchScheduleInfo();
	}, [selectedSchedule]);

	useEffect(() => {
		if(selectedSchedule === -1)
			return;
		axios.get(`${SERVER_URL}/showschedule/${selectedSchedule}`, {
			headers : {
				TOKEN : AUTH_TOKEN
			}
		})
			.then((res) => {
				setScheduleInfo(res.data);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}, [selectedSchedule]);

	const handleModeChange = (e : any, newValue : number) => {
		if(mode <= newValue)
			return;
		setMode(newValue);
	}

	const fetchScheduleInfo = () => {
		// 선택된 상영일정에 대한 자세한 정보 받아오기
		if(selectedSchedule === -1)
			return;
		axios.get(`${SERVER_URL}/showschedule/${selectedSchedule}`, {
			headers : {
				TOKEN : AUTH_TOKEN
			}
		})
			.then((res) => {
				setScheduleInfo(res.data);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const fetchShowSchedule = (selectedMovie : AbleMovieType, selectedDate : string) => {
		if(!selectedMovie || selectedDate === "")
			return;
			// api 수정 후 다시 하기
		axios.post(`${SERVER_URL}/book/schedule`, {
			movi_id : selectedMovie.movi_id,
			show_date : Number(selectedDate)
		})
			.then((res) => {
				if (!res.data?.showschedule_list)
					return;
				setResultSchedule(res.data.showschedule_list);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<>
			<PageTitle
				title="예매 페이지"
				isButtonVisible={true}
			/>
			<div className="book-con">
				<Tabs
					orientation="vertical"
					variant="scrollable"
					value={mode}
					onChange={handleModeChange}
					className="book-tab"
				>
					<Tab label="상영일정 선택" />
					<Tab label="좌석 선택" />
					<Tab label="결제" />
				</Tabs>
				<div className="content-con">
					<div
						role="tabpanel"
						hidden={mode !== 0}
					>
						<BookSchedule
							fetchShowSchedule = {fetchShowSchedule}
							resultSchedule = {resultSchedule}
							setMode={setMode}
							setSelectedSchedule={setSelectedSchedule}
						/>
					</div>
					<div
						role="tabpanel"
						hidden={mode !== 1}
					>
						{
							scheduleInfo &&
							<BookSeat
								mode={mode}
								setMode={setMode}
								scheduleInfo={scheduleInfo}
								payPrice={payPrice}
								setPayPrice={setPayPrice}
								seatNum={seatNum}
								setSeatNum={setSeatNum}
								seatTypeNum={seatTypeNum}
								setSeatTypeNum={setSeatTypeNum}
								seatList={seatList}
								setSeatList={setSeatList}
								disabledSeat={disabledSeat}
								setDisabledSeat={setDisabledSeat}
							/>
						}
					</div>
					<div
						role="tabpanel"
						hidden={mode !== 2}
					>
						{
							scheduleInfo &&
							<BookPay
								mode={mode}
								scheduleInfo={scheduleInfo}
								payPrice={payPrice}
								seatTypeNum={seatTypeNum}
								seatNum={seatNum}
							/>
						}
					</div>
				</div>
			</div>
		</>
	);
}

export default Book;