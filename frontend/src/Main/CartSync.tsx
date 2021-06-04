import React, { useState, useContext, createContext, Dispatch } from 'react';
import { childrenObj } from './Type';

// store cart의 sync를 위한 model

const cartSyncState = createContext<boolean>(true);
const cartSyncDispatch = createContext<Dispatch<boolean>>(() => { });
const cartChangeFunction = createContext<() => void>(() => {});

export const CartSyncContextProvider = ({ children }: childrenObj) => {
	const [bool, setBool] = useState<boolean>(true);

	const toggleBoolean = () => setBool(!bool);

	return (
		<cartSyncDispatch.Provider value={setBool}>
			<cartSyncState.Provider value={bool}>
				<cartChangeFunction.Provider value={toggleBoolean}>
					{children}
				</cartChangeFunction.Provider>
			</cartSyncState.Provider>
		</cartSyncDispatch.Provider>
	)
};

export function useCartState() {
	const context = useContext(cartSyncState);
	return context;
}
export function useCartDispatch() {
	const context = useContext(cartSyncDispatch);
	return context;
}
export function useCartChange() {
	const context = useContext(cartChangeFunction);
	return context;
}