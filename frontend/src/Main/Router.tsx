import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Main } from '../Pages';

const Router : React.FC = () => (
	<Switch>
		<Route path="/" component={Main} />
	</Switch>
);

export default Router;
