import React, { useState, useContext, createContext, Dispatch } from 'react';
import { childrenObj } from './Type';

const tokenState = createContext<string>("");
const tokenDispatch = createContext<Dispatch<string>>(() => { });

export const TokenContextProvider = ({ children }: childrenObj) => {
	const [token, setToken] = useState<string>("");

	return (
		<tokenState.Provider value={token}>
			<tokenDispatch.Provider value={setToken}>
				{children}
			</tokenDispatch.Provider>
		</tokenState.Provider>
	)
};

export function useTokenState() {
	const context = useContext(tokenState);
	return context;
}
export function useTokenDispatch() {
	const context = useContext(tokenDispatch);
	return context;
}