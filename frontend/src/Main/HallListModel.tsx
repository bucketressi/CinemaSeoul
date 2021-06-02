import React, { useState, useContext, createContext, Dispatch, useEffect } from 'react';
import { HallListType, childrenObj, HallType } from './Type';

import axios from 'axios';
import { SERVER_URL } from '../CommonVariable';
import { errorHandler } from './ErrorHandler';
import { useTokenState } from './TokenModel';

const hallState = createContext<HallListType | undefined>(undefined);
const hallDispatch = createContext<Dispatch<HallListType | undefined>>(() => { });
const fetchHallFunction = createContext<() => void>(() => {});

export const HallListContextProvider = ({ children }: childrenObj) => {
	// 공통적으로 쓰이는 page가 많아서 model로 정의함
	const AUTH_TOKEN = useTokenState();
	const [hallList, setHallList] = useState<HallListType | undefined>();

	const fetchHall = () => {
		axios.get(`${SERVER_URL}/hall`, {
			headers : {
				TOKEN : AUTH_TOKEN
			}
		})
			.then((res) => {
				const arr = res.data.data;
				const obj : HallListType= {};
				arr.forEach((hall : HallType) => {
					obj[hall.hall_id] = hall;
				});
				setHallList(obj);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<hallState.Provider value={hallList}>
			<hallDispatch.Provider value={setHallList}>
				<fetchHallFunction.Provider value={fetchHall}>
					{children}
				</fetchHallFunction.Provider>
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
export function usefetchHallFunction() {
	const context = useContext(fetchHallFunction);
	return context;
}