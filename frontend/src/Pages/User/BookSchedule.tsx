import React, { useEffect, useState, Dispatch } from 'react';
import { AbleMovieType, BookShowScheduleType } from '../../Main/Type';
import { Paper, TextField } from '@material-ui/core';
import clsx from 'clsx';

import {getDateStringFromDate, getDateString} from '../../Function';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useHistory } from 'react-router-dom';
import { useTokenState} from '../../Main/TokenModel';
import "../../scss/pages/book.scss";
import { useUserState } from '../../Main/UserModel';

type Props = {
	fetchShowSchedule : (selectedMovie : AbleMovieType, selectedDate : string) => void;
	resultSchedule : BookShowScheduleType[] | undefined;
	setMode : Dispatch<number>;
	setSelectedSchedule : Dispatch<number>;
}

const BookSchedule = ({ fetchShowSchedule, resultSchedule, setMode, setSelectedSchedule } : Props) => {
	const history = useHistory();
	const userId = useUserState();
	const AUTH_TOKEN = useTokenState();
	const [ableMovie, setAbleMovie] = useState<AbleMovieType[]>([]);
	const [selectedMovie, setSelectedMovie] = useState<AbleMovieType | undefined>(undefined);
	const [selectedDate, setSelectedDate] = useState<string>("");

	useEffect(() => {
		setSelectedDate(getDateStringFromDate(new Date()));
		fetchAbleMovie();
	}, []);

	useEffect(() => {
		// 선택되는 영화와 날짜가 바뀔 때마다 가능한 일정 받아오기
		if(!selectedMovie)
			return;
		fetchShowSchedule(selectedMovie, selectedDate);
	},[selectedMovie, selectedDate]);

	const fetchAbleMovie = () => {
		axios.get(`${SERVER_URL}/book/movie`, {
			headers : {
				TOKEN : AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data?.movie_list)
					return;
				setAbleMovie(res.data.movie_list);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const getAvailableAge = (age: string) => {
		if (age === "18세(청소년 관람 불가)") {
			return "청불";
		}
		return age;
	}

	const handleMovieClick = (movi_id : number) => {
		setSelectedMovie(ableMovie.find((movie) => movie.movi_id === movi_id));
	}

	const handleDateChange = (e : any) => {
		setSelectedDate(e.target.value.split('-').join(''));
	}

	const handleShowScheduleClick = (show_id : number) => {
		// 모드를 1로 바꾸기 => 좌석 선택으로 넘어가기
		if(!selectedMovie)
			return;
		// 영화가 청불이면 성인인증 여부 검사
		if(getAvailableAge(selectedMovie.avai_age) === "청불"){
			isAdultChecked().then(res => {
				console.log(res);
				if(!res){
					// 성인인증 안되어있음
					alert("청소년 관람 불가 영화는 성인인증 후에 예매하실 수 있습니다.");
					history.push("/adult/auth");
				}
			})
		}
		setSelectedSchedule(show_id);
		setMode(1);
	}

	/* 성인 영화 검사 */
	const isAdultChecked = () => {
		return axios.get(`${SERVER_URL}/user/adult/${userId}`, {
			headers : {
				TOKEN : AUTH_TOKEN
			}
		})
			.then((res) => {
				return true;
			})
			.catch((e) => {
				return false;
			});
	}
	
	return (
		<div>
			<div className="book-schedule-con">
				<div className="select-movie-con">
					<div className="top-title">
						{
							selectedMovie ?
								selectedMovie.movi_name : "영화 선택"
						}
					</div>
					{
						ableMovie.length ?
							ableMovie.map((movie) =>
								<div key={movie.movi_id} className={clsx("movie-component",movie.movi_id===selectedMovie?.movi_id?"selected":"")} onClick={() => {handleMovieClick(movie.movi_id)}}>
									<div className="age">{getAvailableAge(movie.avai_age)}</div>
									<div className="name">{movie.movi_name}</div>
								</div>
							) : <div className="no-movie">현재 상영 예정인 영화가 없습니다.</div>
					}
				</div>
				<div>
					<div className="select-date-con">
						<div className="top-title">
							{
								selectedDate ?
									getDateString(selectedDate) : "날짜 선택"
							}
						</div>
						<div className="date-picker">
							<TextField
								type="date"
								label="날짜 선택"
								InputLabelProps={{
									shrink: true,
								}}
								value={getDateString(selectedDate)}
								onChange={handleDateChange}
							/>
						</div>
					</div>
					<div className="result-con">
						<div className="top-title">
							예매 가능한 상영일정
						</div>
						<div className="result-schedule-con">
							{
								resultSchedule?.map((schedule : BookShowScheduleType) => 
									<Paper elevation={3} key={schedule.show_id} onClick={() => {handleShowScheduleClick(schedule.show_id)}}className="schedule-component">
										<div className="top-info">{schedule.show_time.substr(0,2)}:{schedule.show_time.substr(2,2)}</div>
										<div className="bottom-info">
											<div>{schedule.rema_amount}/{schedule.hall_seat}</div>
											<div>{schedule.hall_name}</div>
										</div>
									</Paper>
								)
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BookSchedule;