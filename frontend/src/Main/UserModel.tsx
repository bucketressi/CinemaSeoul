import React, { useState, useContext, createContext, Dispatch } from 'react';
import { UserType, childrenObj } from './Type';

const userState = createContext<UserType | undefined>(undefined);
const userDispatch = createContext<Dispatch<UserType>>(() => { });
const userLoginFunction = createContext<(id: string, password: string) => void>(() => { });
const nonUserLoginFunction = createContext<(user : UserType) => void>(() => { });
const logoutFunction = createContext<() => void>(() => { });

export const UserContextProvider = ({ children }: childrenObj) => {
	const [user, setUser] = useState<UserType | undefined>(undefined);
	const initialUser = {
		user_name: "우희은",
		phone_num: "010-4444-4444",
		password: "hihello",
		agreement: "1"
	};

	function userLogin(id: string, password: string) {
		// todo : api로 login하기 => 응답으로 setUser
		setUser(initialUser);
	}

	function nonUserLogin(user : UserType){
		// todo : api로 nonuser-login하기 => 응답으로 setUser
		setUser(initialUser);
	}

	function logout() {
		// todo : api로 logout하기
		setUser(undefined);
	}

	return (
		<nonUserLoginFunction.Provider value={nonUserLogin}>
			<userLoginFunction.Provider value={userLogin}>
				<logoutFunction.Provider value={logout}>
					<userDispatch.Provider value={setUser}>
						<userState.Provider value={user}>
							{children}
						</userState.Provider>
					</userDispatch.Provider>
				</logoutFunction.Provider>
			</userLoginFunction.Provider>
		</nonUserLoginFunction.Provider>
	);
}

export function useUserState() {
	const context = useContext(userState);
	return context;
}
export function useUserDispatch() {
	const context = useContext(userDispatch);
	return context;
}
export function useUserLogin() {
	const context = useContext(userLoginFunction);
	return context;
}
export function useNonUserLogin() {
	const context = useContext(nonUserLoginFunction);
	return context;
}
export function useLogout() {
	const context = useContext(logoutFunction);
	return context;
}