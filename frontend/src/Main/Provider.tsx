import React from 'react';
import { Router } from './Router';
import { UserContextProvider } from './UserModel';

const Provider : React.FC = () => {
	const a = 1;
	return (
		<UserContextProvider>
			<Router />
		</UserContextProvider>
	);
};

export default Provider;
