import React from 'react';

import { Grid } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';

import { AdminHome, AdminTheater } from '.';
import { AdminLayout } from '../Components';

const AdminMain = () => {
	const a = 1;
	return (
		<AdminLayout>
			<Grid className="main-page">
				admin-main-page
				<Route path="/admin/home" component={AdminHome}/>
				<Route path="/admin/theater" component={AdminTheater}/>
			</Grid>
		</AdminLayout>
	);
}

export default AdminMain;