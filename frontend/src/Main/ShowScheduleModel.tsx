import React, { useState, useContext, createContext, Dispatch, useEffect } from 'react';
import { ShowScheduleListType, childrenObj } from './Type';

const showScheduleListState = createContext<ShowScheduleListType | undefined>(undefined);
const showScheduleListDispatch = createContext<Dispatch<ShowScheduleListType | undefined>>(() => { });
const initialShowScheduleData = {
	showschedule_list: [
		{
			show_id: 2,
			movi_id: 126,
			movi_name : "귀멸의 칼날",
			hall_id: 42,
			hall_name: "42-1관",
			show_date: "20210525",
			show_time: "0141",
			end_time: "20211230603",
			hall_seat: 4,
			rema_seat: 3
		},{
			show_id: 3,
			movi_id: 127,
			movi_name : "앨리스",
			hall_id: 43,
			hall_name: "43-1관",
			show_date: "20210528",
			show_time: "0150",
			end_time: "20211129603",
			hall_seat: 20,
			rema_seat: 4
		},{
			show_id: 4,
			movi_id: 107,
			movi_name : "짱구와 친구들",
			hall_id: 43,
			hall_name: "43-1관",
			show_date: "20210529",
			show_time: "0190",
			end_time: "20211129603",
			hall_seat: 15,
			rema_seat: 4
		}
	],
	page: 1,
	totalpage: 1,
	amount: 10
};

export const ShowScheduleListContextProvider = ({ children }: childrenObj) => {
	// 공통적으로 쓰이는 page가 많아서 model로 정의함 => 영화 리스트 데이터
	const [showScheduleList, setShowScheduleList] = useState<ShowScheduleListType | undefined>(initialShowScheduleData);

	return (
		<showScheduleListState.Provider value={showScheduleList}>
			<showScheduleListDispatch.Provider value={setShowScheduleList}>
				{children}
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