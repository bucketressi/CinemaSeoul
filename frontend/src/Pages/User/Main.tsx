import React from 'react';

import { Link } from 'react-router-dom';
import { MovieCard, PageTitle } from '../../Components';
import "../../scss/pages/main.scss";
import { SimpleMovieType } from '../../Main/Type';
import { useMovieListState } from '../../Main/MovieListModel';

const Main = () => {
	// 메인 페이지
	const movieListData = useMovieListState();

	return (
		<>
			<PageTitle title="상영 중인 영화" isButtonVisible={false}/>
			<div className="movie-list">
				{
					movieListData &&
					movieListData.movie_list.map((movie : SimpleMovieType)=>{
						return (
							<Link key={movie.movi_id} to={`/movie/${movie.movi_id}`}>
								<MovieCard
									image={movie.image}
									movi_name = {movie.movi_name}
									accu_audience = {movie.accu_audience}
									avi_age={movie.avi_age}
									open_date={movie.open_date}
								/>
							</Link>
						)
					})
				}
			</div>
		</>
	);
}

export default Main;