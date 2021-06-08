import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';

import { Link } from 'react-router-dom';
import { MovieCard, PageTitle } from '../../Components';
import "../../scss/pages/main.scss";
import { SimpleMovieType } from '../../Main/Type';

const Main = () => {
	// 메인 페이지
	const token = useTokenState();
	const [nowMovie, setNowMovie] = useState<SimpleMovieType[]>([]);

	useEffect(() => {
		axios.post(`${SERVER_URL}/movie/list`, {
			//전체 : 0, 상영중  1, 상영예정 : 2
			"page": 1,
			"stat": 1,
			"sort": 0
		}, {
			headers: {
				"TOKEN": token
			}
		})
			.then((res) => {
				if (!res.data || !res.data.movi_list)
					return;
				setNowMovie(res.data.movi_list);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}, []);

	return (
		<>
			<PageTitle title="상영 중인 영화" isButtonVisible={false} />
			<div className="movie-list">
				{
					nowMovie &&
					nowMovie.map((movie: SimpleMovieType) => {
						return (
							<Link key={movie.movi_id} to={`/movie/${movie.movi_id}`}>
								<MovieCard
									movi_id={movie.movi_id}
									imageBase64={movie.imageBase64}
									movi_name={movie.movi_name}
									accu_audience={movie.accu_audience}
									avai_age={movie.avai_age}
									open_date={movie.open_date}
									rating={movie.rating}
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