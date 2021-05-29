import React from 'react';
import { Router } from './Router';
import { UserContextProvider } from './UserModel';
import { AdminContextProvider } from './AdminModel';

const Provider : React.FC = () => {
	const a = 1;
	return (
		<AdminContextProvider>
			<UserContextProvider>
				<Router />
			</UserContextProvider>
		</AdminContextProvider>
	);
};

export default Provider;
