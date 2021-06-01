import React from 'react';
import { Router } from './Router';
import { UserContextProvider } from './UserModel';
import { AdminContextProvider } from './AdminModel';
import { MovieListContextProvider } from './MovieListModel';
import { ShowScheduleListContextProvider } from './ShowScheduleModel';
import { HallListContextProvider } from './HallListModel';
import { TokenContextProvider } from './TokenModel';
import { CodeContextProvider } from './CodeModel';

const Provider: React.FC = () => {
	const a = 1;
	return (
		<TokenContextProvider>
			<CodeContextProvider>
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
			</CodeContextProvider>
		</TokenContextProvider>
	);
};

export default Provider;
