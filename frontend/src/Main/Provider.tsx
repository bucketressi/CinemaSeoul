import React from 'react';

import { LogicProvider } from './ViewModel';
import { PracticeContextProvider } from './Model/PracticeModel';
import Router from './Router';

const Provider : React.FC = () => {
	const a = 1;
	return (
		<PracticeContextProvider>
			<LogicProvider>
				<Router />
			</LogicProvider>
		</PracticeContextProvider>
	);
};

export default Provider;
