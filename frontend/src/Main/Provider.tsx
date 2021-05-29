import React from 'react';
import { Router } from './Router';
import { UserContextProvider } from './UserModel';
import { AdminContextProvider } from './AdminModel';
import { MovieListContextProvider } from './MovieListModel';
import { ShowScheduleListContextProvider } from './ShowScheduleModel';

const Provider: React.FC = () => {
	const a = 1;
	return (
		<AdminContextProvider>
			<UserContextProvider>
				<MovieListContextProvider>
					<ShowScheduleListContextProvider>
						<Router />
					</ShowScheduleListContextProvider>
				</MovieListContextProvider>
			</UserContextProvider>
		</AdminContextProvider>
	);
};

export default Provider;
