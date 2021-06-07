import React, { useState, useContext, createContext, Dispatch, useEffect } from 'react';
import { ShowScheduleListType, ShowScheduleListObjType, childrenObj } from './Type';
import axios from 'axios';
import { SERVER_URL } from '../CommonVariable';
import { errorHandler } from './ErrorHandler';
import { useTokenState } from './TokenModel';

const showScheduleListState = createContext<ShowScheduleListType | undefined>(undefined);
const showScheduleListObjState = createContext<ShowScheduleListObjType | undefined>(undefined);
const showScheduleListDispatch = createContext<Dispatch<ShowScheduleListType | undefined>>(() => { });
const fetchShowScheduleFunction = createContext< (page: number, movi_id?: number[], hall_id?: number[], start_date?: string, end_date?: string) => void>( (page: number, movi_id?: number[], hall_id?: number[], start_date?: string, end_date?: string) => { });
const totalPageState = createContext<number>(1);

export const ShowScheduleListContextProvider = ({ children }: childrenObj) => {
	const AUTH_TOKEN = useTokenState();

	const [showScheduleList, setShowScheduleList] = useState<ShowScheduleListType | undefined>(undefined);
	const [showScheduleObjList, setShowScheduleObjList] = useState<ShowScheduleListObjType | undefined>(undefined);
	const [totalPage, setTotalPage] = useState<number>(1);

	useEffect(() => {
		if (!showScheduleList)
			return;
		const obj: ShowScheduleListObjType = {};
		showScheduleList.map((showSchedule) => {
			obj[showSchedule.show_id] = showSchedule;
		})
		setShowScheduleObjList(obj);
	}, [showScheduleList]);


	const fetchShowSchedule = (page: number, movi_id?: number[], hall_id?: number[], start_date?: string, end_date?: string) => {
		const dateObj = new Date();
		const month = (dateObj.getMonth() + 1).toString.length !== 1 ? (dateObj.getMonth() + 1) : "0" + (dateObj.getMonth() + 1);
		const date = (dateObj.getDate()).toString.length !== 1 ? (dateObj.getDate()) : "0" + (dateObj.getDate());
		const dateString = `${dateObj.getFullYear()}${month}${date}`;

		axios.post(`${SERVER_URL}/showschedule/list`, {
			"page": page?page:1,
			//아래 각각에 해당 하는 정보가 안넘어오거나 비어있으면 default 처리
			"movi_id": !movi_id || !movi_id.length ? null : movi_id,
			"hall_id": !hall_id || !hall_id.length ? null : hall_id,
			"start_date": !start_date || start_date === "" ? dateString : start_date, //yyyymmdd
			"end_date": !end_date ||end_date === "" ? null : end_date
		}, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data || !res.data.showschedule_list || !res.data.totalpage)
					return;
				setShowScheduleList(res.data.showschedule_list);
				setTotalPage(res.data.totalpage)
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<showScheduleListState.Provider value={showScheduleList}>
			<showScheduleListObjState.Provider value={showScheduleObjList}>
				<showScheduleListDispatch.Provider value={setShowScheduleList}>
					<fetchShowScheduleFunction.Provider value={fetchShowSchedule}>
						<totalPageState.Provider value={totalPage}>
							{children}
						</totalPageState.Provider>
					</fetchShowScheduleFunction.Provider>
				</showScheduleListDispatch.Provider>
			</showScheduleListObjState.Provider>
		</showScheduleListState.Provider>
	);
}

export function useShowScheduleListState() {
	const context = useContext(showScheduleListState);
	return context;
}
export function useShowScheduleListObjState() {
	const context = useContext(showScheduleListObjState);
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
export function useTotalPageState() {
	const context = useContext(totalPageState);
	return context;
}