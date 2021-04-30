import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Main, AdminMain } from '../Pages';

const Router : React.FC = () => (
	<Switch>
		<Route path="/user" component={Main} />
		<Route path="/admin" component={AdminMain} />
	</Switch>
);

export default Router;
