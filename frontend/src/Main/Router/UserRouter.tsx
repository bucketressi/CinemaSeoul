import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { Ask, Book, Error, Event, FAQ, Login, MovieList, MyMovie, Mypage, Notice, Pay, PointDescription, SignUp, Store, TheaterDescription, Main } from '../../Pages/User';

const UserRouter : React.FC = () => (
	<Switch>
		<Route path="/ask" component={Ask}/>
		<Route path="/book" component={Book}/>
		<Route path="/event" component={Event}/>
		<Route path="/faq" component={FAQ}/>
		<Route path="/login" component={Login}/>
		<Route path="/main" component={Main}/>
		<Route path="/movie/:movie_id" component={MovieList}/>
		<Route path="/mymovie" component={MyMovie}/>
		<Route path="/mypage" component={Mypage}/>
		<Route path="/notice" component={Notice}/>
		<Route path="/pay" component={Pay}/>
		<Route path="/point" component={PointDescription}/>
		<Route path="/signon" component={SignUp}/>
		<Route path="/store" component={Store}/>
		<Route path="/theater" component={TheaterDescription}/>
		<Route path="/error" component={Error}/>
		<Redirect to="/error" />
	</Switch>
);

export default UserRouter;
