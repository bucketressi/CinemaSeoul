import React from 'react';
import { Router } from './Router';
import { UserContextProvider } from './UserModel';
import { AdminContextProvider } from './AdminModel';
import { MovieListContextProvider } from './MovieListModel';
import { ShowScheduleListContextProvider } from './ShowScheduleModel';
import { HallListContextProvider } from './HallListModel';

const Provider: React.FC = () => {
	const a = 1;
	return (
		<AdminContextProvider>
			<UserContextProvider>
				<MovieListContextProvider>
					<ShowScheduleListContextProvider>
						<HallListContextProvider>
							<Router />
						</HallListContextProvider>
					</ShowScheduleListContextProvider>
				</MovieListContextProvider>
			</UserContextProvider>
		</AdminContextProvider>
	);
};

export default Provider;
