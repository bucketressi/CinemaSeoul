import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { 
	AdminMain,
	AdminAsk,
	AdminBlackList,
	AdminBookRecord,
	AdminEvent,
	AdminFAQ,
	AdminGenre,
	AdminHall,
	AdminHome,
	AdminMovie,
	AdminNotice,
	AdminPay,
	AdminPeople,
	AdminSales,
	AdminShowSCH,
	AdminStore,
	AdminTheater,
	AdminError,
 } from '../../Pages/Admin';

const AdminRouter : React.FC = () => (
	<Switch>
		<Route path="/admin" component={AdminAdmin}/>
		<Route path="/ask" component={AdminAsk}/>
		<Route path="/blacklist" component={AdminBlackList}/>
		<Route path="/book" component={AdminBookRecord}/>
		<Route path="/event" component={AdminEvent}/>
		<Route path="/faq" component={AdminFAQ}/>
		<Route path="/genre" component={AdminGenre}/>
		<Route path="/hall" component={AdminHall}/>
		<Route path="/home" component={AdminHome}/>
		<Route path="/main" component={AdminMain}/>
		<Route path="/movie" component={AdminMovie}/>
		<Route path="/notice" component={AdminNotice}/>
		<Route path="/pay" component={AdminPay}/>
		<Route path="/people" component={AdminPeople}/>
		<Route path="/sales" component={AdminSales}/>
		<Route path="/showsch" component={AdminShowSCH}/>
		<Route path="/store" component={AdminStore}/>
		<Route path="/theater" component={AdminTheater}/>
		<Route path="/error" component={AdminError}/>
		<Redirect to="/error" />
	</Switch>
);

export default AdminRouter;
