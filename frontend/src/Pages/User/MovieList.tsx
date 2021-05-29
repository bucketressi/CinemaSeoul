import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MovieCard, SearchTab } from '../../Components';
import { SimpleMovieType, MovieListType } from '../../Main/Type';
import { useMovieListState } from '../../Main/MovieListModel';


const MovieList = () => {
	// 영화 목록 페이지
	const movieListData = useMovieListState();

	return (
		<div className="movie-wrap">
			<SearchTab />
			<div className="movie-list-con">
				{
					movieListData && movieListData.movie_list &&
					movieListData.movie_list.map((movie: SimpleMovieType) => {
						return (
							<Link key={movie.movi_id} to={`/movie/${movie.movi_id}`}>
								<MovieCard
									image={movie.image}
									movi_name={movie.movi_name}
									accu_audience={movie.accu_audience}
									avi_age={movie.avi_age}
									open_date={movie.open_date}
								/>
							</Link>
						)
					})
				}
			</div>
		</div>
	);
}

export default MovieList;