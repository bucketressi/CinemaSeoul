import React, { useState, useContext, createContext, Dispatch } from 'react';
import { AdminType, childrenObj } from './Type';

const adminState = createContext<AdminType | undefined>(undefined);
const adminDispatch = createContext<Dispatch<AdminType>>(() => { });
const adminLoginFunction = createContext<(id: string, password: string) => void>(() => { });
const logoutFunction = createContext<() => void>(() => { });

export const AdminContextProvider = ({ children }: childrenObj) => {
	const [admin, setAdmin] = useState<AdminType | undefined>(undefined);
	const initialAdmin = {
		admi_name: "우희은",
		birth: "20202020",
		phone_num: "010-4444-4444",
		password: "hihello",
		admi_auth_code : "1",
		position : "과장",
		address : "노원구",
		start_date : "20202020"
	};

	function adminLogin(id: string, password: string) {
		// todo : api로 login하기 => 응답으로 setUser
		setAdmin(initialAdmin);
	}

	function logout() {
		// todo : api로 logout하기
		setAdmin(undefined);
	}

	return (
		<adminState.Provider value={admin}>
			<adminDispatch.Provider value={setAdmin}>
				<adminLoginFunction.Provider value={adminLogin}>
					<logoutFunction.Provider value={logout}>
						{children}
					</logoutFunction.Provider>
				</adminLoginFunction.Provider>
			</adminDispatch.Provider>
		</adminState.Provider>
	);
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
export function useLogout() {
	const context = useContext(logoutFunction);
	return context;
}