import React from 'react';

import { Layout, MovieCard, PageTitle } from '../../Components';
import "../../scss/pages/main.scss";

const Main = () => {
	// 메인 페이지
	const a = 1;
	const movi_name = "분노의 질주, 더 얼티메이트";
	const bookrecord = 49.4;
	const open_date = new Date("2021-05-23");
	const avi_age = 19;

	return (
		<Layout>
			<PageTitle title="상영 중인 영화"/>
			<div className="movie-list">
				{
					[1,2,3].map((i) => 
						<MovieCard
							key = {i}
							movi_name = {movi_name}
							bookrecord = {bookrecord}
							open_date = {open_date}
							avi_age = {avi_age}
						/>)
				}
			</div>
		</Layout>
	);
}

export default Main;