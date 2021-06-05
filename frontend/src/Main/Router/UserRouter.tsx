import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { Ask, Book, Error, Event, FAQ, Login, MovieList, MovieExact, MyMovie, Mypage, Notice, ProductPay, PointDescription, SignUp, Store, StoreExact, TheaterDescription, Main } from '../../Pages/User';
import { Layout } from '../../Components';

const UserRouter : React.FC = () => (
	<Layout>
		<Switch>
			<Route path="/ask" component={Ask}/>
			<Route exact path="/book" component={Book}/>
			<Route path="/event" component={Event}/>
			<Route path="/faq" component={FAQ}/>
			<Route path="/login" component={Login}/>
			<Route path="/main" component={Main}/>
			<Route exact path="/movie" component={MovieList}/>
			<Route exact path="/movie/search" component={MovieList}/>
			<Route path="/movie/:movie_id" component={MovieExact}/>
			<Route path="/mymovie" component={MyMovie}/>
			<Route path="/mypage" component={Mypage}/>
			<Route path="/notice" component={Notice}/>
			<Route path="/point" component={PointDescription}/>
			<Route path="/signup" component={SignUp}/>
			<Route exact path="/product" component={Store}/>
			<Route exact path="/product/pay" component={ProductPay}/>
			<Route path="/product/:prod_id" component={StoreExact}/>
			<Route path="/theater" component={TheaterDescription}/>
			<Route path="/error" component={Error}/>
			<Redirect to="/main" />
		</Switch>
	</Layout>
);

export default UserRouter;
