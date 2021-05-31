import React, { useState, useContext, createContext, Dispatch } from 'react';
import { UserType, childrenObj } from './Type';
import axios from 'axios';
import { SERVER_URL } from '../CommonVariable';
import { errorHandler } from './ErrorHandler';
import { useTokenDispatch } from './TokenModel';
import { useHistory } from 'react-router-dom';

const userState = createContext<UserType | undefined>(undefined);
const userDispatch = createContext<Dispatch<UserType>>(() => { });
const userLoginFunction = createContext<(id: string, password: string) => void>(() => { });
const nonUserLoginFunction = createContext<(user : UserType) => void>(() => { });
const logoutFunction = createContext<() => void>(() => { });

export const UserContextProvider = ({ children }: childrenObj) => {
	const setToken = useTokenDispatch();
	const history = useHistory();

	const [user, setUser] = useState<UserType | undefined>(undefined);
	const initialUser = {
		user_name: "우희은",
		phone_num: "010-4444-4444",
		password: "hihello",
		agreement: "1"
	};

	function userLogin(email: string, password: string) {
		axios.post(`${SERVER_URL}/user/login`, {
			"email" : email,
			"password" : password
		})
			.then((res) => {
				setToken(res.data); // token 세팅
				history.push("/main");
			})
			.catch((e) => {
				errorHandler(e, true, ["", "", "로그인에 실패하였습니다. 아이디, 비밀번호를 확인해주세요.", ""]);
			});
	}

	function nonUserLogin(user : UserType){
		axios.post(`${SERVER_URL}/user/login/non-member`, {
			"user_name" : user.user_name,
			"phone_num" : user.phone_num,
			"password" : user.password,
			"agreement" : user.agreement
		})
			.then((res) => {
				setToken(res.data); // token 세팅
				history.push("/main");
			})
			.catch((e) => {
				errorHandler(e, true, ["", "", "로그인에 실패하였습니다. 아이디, 비밀번호를 확인해주세요.", ""]);
			});
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