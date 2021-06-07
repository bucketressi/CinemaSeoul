import React, { useEffect } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { AdminLayout } from '../../Components';
import { useAdminState } from '../UserModel';
import { useHistory } from 'react-router-dom';

import {
	AdminMain,
	AdminMovieExact,
	AdminModifyMovie,
	AdminMyPage,
	AdminAsk,
	AdminBlackList,
	AdminEvent,
	AdminEmployee,
	AdminFAQ,
	AdminFAQExact,
	AdminGenre,
	AdminHall,
	AdminHome,
	AdminMovieList,
	AdminNotice,
	AdminNoticeExact,
	AdminList,
	AdminPeople,
	AdminSales,
	AdminShowSchedule,
	AdminModifyShowSchedule,
	AdminProduct,
	AdminProductModify,
	AdminTheater,
	AdminError,
	AdminLogin,
	AdminUser,
	AdminAudienceRecord,
	AdminEventExact
} from '../../Pages/Admin';

const AdminRouter: React.FC = () => {
	const admin = useAdminState();
	const history = useHistory();

	useEffect(()=> {
		if(admin !== undefined || location.pathname == "/admin/login")
			return;
		alert("로그인 후 이용해주세요.");
		history.push("/admin/login");
	},[location.pathname]);

	return (
		<AdminLayout>
			<Switch>
				<Route exact path="/admin" component={AdminMain} />
				<Route path="/admin/ask" component={AdminAsk} />
				<Route path="/admin/login" component={AdminLogin} />
				<Route path="/admin/user" component={AdminUser} />
				<Route path="/admin/myPage" component={AdminMyPage} />
				<Route path="/admin/blacklist" component={AdminBlackList} />
        <Route path="/admin/book" component={AdminBookRecord} />
				<Route path="/admin/event" component={AdminEvent} />
				<Route path="/admin/employee" component={AdminEmployee} />
				<Route path="/admin/faq" component={AdminFAQ} />
				<Route path="/admin/audience" component={AdminAudienceRecord} />
				<Route exact path="/admin/event" component={AdminEvent} />
				<Route path="/admin/event/:event_id" component={AdminEventExact} />
				<Route exact path="/admin/faq" component={AdminFAQ} />
				<Route path="/admin/faq/:faq_id" component={AdminFAQExact} />
				<Route path="/admin/genre" component={AdminGenre} />
				<Route path="/admin/hall" component={AdminHall} />
				<Route path="/admin/home" component={AdminHome} />
				<Route exact path="/admin/movie" component={AdminMovieList} />
				<Route exact path="/admin/movie/search" component={AdminMovieList} />
				<Route path="/admin/movie/:movie_id" component={AdminMovieExact} />
				<Route path="/admin/modify/movie/:movie_id" component={AdminModifyMovie} />
				<Route exact path="/admin/notice" component={AdminNotice} />
				<Route path="/admin/notice/:notice_id" component={AdminNoticeExact} />
				<Route path="/admin/list" component={AdminList} />
				<Route path="/admin/people" component={AdminPeople} />
				<Route path="/admin/sales" component={AdminSales} />
				<Route exact path="/admin/showschedule" component={AdminShowSchedule} />
				<Route path="/admin/modify/showschedule/:schedule_id" component={AdminModifyShowSchedule} />
				<Route exact path="/admin/product" component={AdminProduct} />
				<Route path="/admin/product/:product_id" component={AdminProductModify} />
				<Route path="/admin/theater" component={AdminTheater} />
				<Route path="/admin/error" component={AdminError} />
				<Redirect to="/admin" />
			</Switch>
		</AdminLayout>
	);
}

export default AdminRouter;
