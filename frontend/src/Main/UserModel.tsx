import React, { useState, useContext, createContext, Dispatch } from 'react';
import { UserType, childrenObj } from './Type';
import axios from 'axios';
import { SERVER_URL } from '../CommonVariable';
import { errorHandler } from './ErrorHandler';
import { useTokenDispatch } from './TokenModel';
import { useHistory } from 'react-router-dom';

const userState = createContext<number | undefined>(undefined);
const userDispatch = createContext<Dispatch<number>>(() => { });
const userLoginFunction = createContext<(id: string, password: string) => void>(() => { });
const nonUserLoginFunction = createContext<(user: UserType) => void>(() => { });
const adminState = createContext<number | undefined>(undefined);
const adminDispatch = createContext<Dispatch<number>>(() => { });
const adminLoginFunction = createContext<(id: string, password: string) => void>(() => { });
const logoutFunction = createContext<() => void>(() => { });

export const UserContextProvider = ({ children }: childrenObj) => {
	const setToken = useTokenDispatch();
	const history = useHistory();

	const [user, setUser] = useState<number | undefined>(undefined);
	const [admin, setAdmin] = useState<number | undefined>(undefined);

	function userLogin(email: string, password: string) {
		axios.post(`${SERVER_URL}/user/login`, {
			"email": email,
			"password": password
		})
			.then((res) => {
				setToken(res.data.token); // token 세팅
				setUser(res.data.user_id);
				setAdmin(undefined);
				history.goBack();
			})
			.catch((e) => {
				errorHandler(e, true, ["", "", "로그인에 실패하였습니다. 아이디, 비밀번호를 확인해주세요.", ""]);
			});
	}

	function nonUserLogin(user: UserType) {
		axios.post(`${SERVER_URL}/user/login/non-member`, {
			"user_name": user.user_name,
			"phone_num": user.phone_num,
			"password": user.password,
			"agreement": user.agreement
		})
			.then((res) => {
				setToken(res.data.token); // token 세팅
				setUser(res.data.user_id);
				setAdmin(undefined);
				history.goBack();
			})
			.catch((e) => {
				errorHandler(e, true, ["", "", "로그인에 실패하였습니다. 아이디, 비밀번호를 확인해주세요.", ""]);
			});
	}

	function adminLogin(email: string, password: string) {
		axios.post(`${SERVER_URL}/admin/login`, {
			"email": email,
			"password": password
		})
			.then((res) => {
				setToken(res.data.token); // token 세팅
				setAdmin(res.data.admi_id);
				console.log(res.data);
				setUser(undefined);
				history.goBack();
			})
			.catch((e) => {
				errorHandler(e, true, ["", "", "로그인에 실패하였습니다. 아이디, 비밀번호를 확인해주세요.", ""]);
			});
	}

	function logout() {
		setUser(undefined);
		setAdmin(undefined);
		setToken("");
	}

	return (
		<nonUserLoginFunction.Provider value={nonUserLogin}>
			<userLoginFunction.Provider value={userLogin}>
				<logoutFunction.Provider value={logout}>
					<userDispatch.Provider value={setUser}>
						<userState.Provider value={user}>
							<adminState.Provider value={admin}>
								<adminDispatch.Provider value={setAdmin}>
									<adminLoginFunction.Provider value={adminLogin}>
										{children}
									</adminLoginFunction.Provider>
								</adminDispatch.Provider>
							</adminState.Provider>
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
export function useAdminState() {
	const context = useContext(adminState);
	return context;
}
export function useAdminDispatch() {
	const context = useContext(adminDispatch);
	return context;
}
export function useAdminLogin() {
	const context = useContext(adminLoginFunction);
	return context;
}