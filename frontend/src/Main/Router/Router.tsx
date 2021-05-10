import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { UserRouter, AdminRouter } from '.';

const Router : React.FC = () => (
	<Switch>
		<Route path="/admin" component={AdminRouter} />
		<Route path="/" component={UserRouter} />
	</Switch>
);

export default Router;
