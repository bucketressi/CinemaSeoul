import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MovieCard, SearchTab } from '../../Components';
import { SimpleMovieType } from '../../Main/Type';
import { useMovieListState, useFetchMovieFunction, useTotalPageState } from '../../Main/MovieListModel';
import { Menu, MenuItem, Select, TextField } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

const MovieList = () => {
	// 영화 목록 페이지
	const fetchMovie = useFetchMovieFunction();
	const movieListData = useMovieListState();
	const totalPage = useTotalPageState();
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		fetchMovie();
	}, []);

	const handlePageChange = (e: any, pageNumber: number) => { setPage(pageNumber); };

	return (
		<div className="movie-wrap">
			<div className="movie-con">
				<div className="stat-sort-con">
					<SearchTab
						page={page}
					/>
				</div>
				<div className="movie-content-con">
					<div className="movie-list-con">
						<div className="movie-list">
							{
								movieListData &&
								movieListData.map((movie: SimpleMovieType) => {
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
						<Pagination className="pagination" count={totalPage} page={page} onChange={handlePageChange} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default MovieList;