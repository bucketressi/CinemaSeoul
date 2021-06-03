import React, { useState, useContext, createContext, Dispatch, useEffect } from 'react';
import { ShowScheduleListType, childrenObj } from './Type';
import axios from 'axios';
import { SERVER_URL } from '../CommonVariable';
import { errorHandler } from './ErrorHandler';
import { useTokenState } from './TokenModel';

const showScheduleListState = createContext<ShowScheduleListType | undefined>(undefined);
const showScheduleListDispatch = createContext<Dispatch<ShowScheduleListType | undefined>>(() => { });
const fetchShowScheduleFunction = createContext<()=>void>(()=>{});

export const ShowScheduleListContextProvider = ({ children }: childrenObj) => {
	const AUTH_TOKEN = useTokenState();

	const [showScheduleList, setShowScheduleList] = useState<ShowScheduleListType | undefined>(undefined);

	const fetchShowSchedule = () => {
		// 이것부터 하세요~ 6/3
		console.log(new Date());
		const dateObj = new Date();
		const month = (dateObj.getMonth()+1).toString.length !== 1 ? (dateObj.getMonth()+1) : "0" + (dateObj.getMonth()+1);
		const date = (dateObj.getDate()).toString.length !== 1 ? (dateObj.getDate()) : "0" + (dateObj.getDate());
		const dateString = `${dateObj.getFullYear()}${month}${date}`;

		axios.post(`${SERVER_URL}/showschedule/list`, {
			"page" : 1,    
			"movi_id" : [126, 143],
			"start_date" : dateString, // 오늘 날짜 
			"end_date" : null
		}, {
			headers : {
				TOKEN : AUTH_TOKEN
			}
		})
			.then((res) => {
				console.log(res);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<showScheduleListState.Provider value={showScheduleList}>
			<showScheduleListDispatch.Provider value={setShowScheduleList}>
				<fetchShowScheduleFunction.Provider value={fetchShowSchedule}>
					{children}
				</fetchShowScheduleFunction.Provider>
			</showScheduleListDispatch.Provider>
		</showScheduleListState.Provider>
	);
}

export function useShowScheduleListState() {
	const context = useContext(showScheduleListState);
	return context;
}
export function useShowScheduleListDispatch() {
	const context = useContext(showScheduleListDispatch);
	return context;
}
export function useFetchShowSchedule() {
	const context = useContext(fetchShowScheduleFunction);
	return context;
}