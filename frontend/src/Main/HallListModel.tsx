import React, { useState, useContext, createContext, Dispatch } from 'react';
import { HallListType, childrenObj } from './Type';

const hallState = createContext<HallListType | undefined>(undefined);
const hallDispatch = createContext<Dispatch<HallListType | undefined>>(() => { });
const initialHallData = {
	data: [
		{
			hall_id: 42,
			hall_name: "42-1관",
			hall_row: 2,
			hall_col: 2,
			avai_seat_amount: 3 // => 가능 좌석 수
		},{
			hall_id: 43,
			hall_name: "43-1관",
			hall_row: 4,
			hall_col: 4,
			avai_seat_amount: 10 // => 가능 좌석 수
		}
	]
}

export const HallListContextProvider = ({ children }: childrenObj) => {
	// 공통적으로 쓰이는 page가 많아서 model로 정의함
	const [hallList, setHallList] = useState<HallListType | undefined>(initialHallData);

	return (
		<hallState.Provider value={hallList}>
			<hallDispatch.Provider value={setHallList}>
				{children}
			</hallDispatch.Provider>
		</hallState.Provider>
	);
}

export function useHallListState() {
	const context = useContext(hallState);
	return context;
}
export function useHallListDispatch() {
	const context = useContext(hallDispatch);
	return context;
}