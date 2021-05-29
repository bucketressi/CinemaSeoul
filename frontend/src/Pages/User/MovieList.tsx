import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MovieCard, SearchTab } from '../../Components';
import { SimpleMovieType, MovieListType } from '../../Main/Type';

const MovieData = {
	movie_list: [
		{
			movi_id: 1,
			movi_name: "귀멸의 칼날",
			rating: 4.8,
			avi_age: 15,
			open_date: new Date("2021/05/30"),
			image: "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202101/16908_103_1.jpg"
		}, {
			movi_id: 2,
			movi_name: "보이저스",
			rating: 4.6,
			avi_age: 19,
			open_date: new Date("2021/06/03"),
			image: "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17322_103_1.jpg"
		}, {
			movi_id: 3,
			movi_name: "보이저스",
			rating: 4.6,
			avi_age: 19,
			open_date: new Date("2021/06/03"),
			image: "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17322_103_1.jpg"
		}, {
			movi_id: 4,
			movi_name: "보이저스",
			rating: 4.6,
			avi_age: 19,
			open_date: new Date("2021/06/03"),
			image: "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17322_103_1.jpg"
		}
	],
	page: 1,
	totalpage: 1,
	amount: 2
};

const MovieList = () => {
	// 영화 목록 페이지
	const [movieList, setMovieList] = useState<MovieListType | undefined>(undefined);

	useEffect(() => {
		// 처음에 MovieData 받아오기 , movie list api 호출
		setMovieList(MovieData);
	});

	return (
		<div className="movie-wrap">
			<SearchTab />
			<div className="movie-list-con">
				{
					MovieData && MovieData.movie_list &&
					MovieData.movie_list.map((movie: SimpleMovieType) => {
						return (
							<Link key={movie.movi_id} to={`/movie/${movie.movi_id}`}>
								<MovieCard
									image={movie.image}
									movi_name={movie.movi_name}
									rating={movie.rating}
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