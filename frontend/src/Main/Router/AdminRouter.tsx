import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { AdminMain } from '../../Pages/Admin';

const AdminRouter : React.FC = () => (
	<Switch>
		<Route path="/" component={AdminMain}/>
	</Switch>
);

export default AdminRouter;
