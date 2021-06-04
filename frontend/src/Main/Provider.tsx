import React from 'react';
import { Router } from './Router';
import { UserContextProvider } from './UserModel';
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
				<UserContextProvider>
					<MovieListContextProvider>
						<ShowScheduleListContextProvider>
							<HallListContextProvider>
								<Router />
							</HallListContextProvider>
						</ShowScheduleListContextProvider>
					</MovieListContextProvider>
				</UserContextProvider>
			</CodeContextProvider>
		</TokenContextProvider>
	);
};

export default Provider;
