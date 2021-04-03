import React, { useState, useContext, createContext, Dispatch } from 'react';
import { childrenObj } from '../Type';

const PracticeState = createContext<string>("");
const PracticeDispatch = createContext<Dispatch<string>>(() => {});

export const PracticeContextProvider = ({ children } : childrenObj) => {
	const [string, setString] = useState<string>("hi");

	return (
		<PracticeState.Provider value={string}>
			<PracticeDispatch.Provider value={setString}>
				{children}
			</PracticeDispatch.Provider>
		</PracticeState.Provider>
	);
}

export function useStringState(){
	const context = useContext(PracticeState);
	return context;
}

export function useStringDispatch(){
	const context = useContext(PracticeDispatch);
	return context;
}
