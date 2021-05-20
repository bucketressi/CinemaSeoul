import React, { useState, useContext, createContext } from 'react';
import { useStringDispatch } from './Model/PracticeModel';
import { childrenObj } from './Type';

const PracticeFunction = createContext<(str: string) => void>((str: string) => {});

export const LogicProvider = ({ children } : childrenObj) => {
	const dispatch = useStringDispatch();

	const changeString = (str: string) => {
		dispatch(str);
	};

	return (
		<PracticeFunction.Provider value={changeString}>
			{children}
		</PracticeFunction.Provider>
	);
}

export function useChangeString(){
	const context = useContext(PracticeFunction);
	return context;
}