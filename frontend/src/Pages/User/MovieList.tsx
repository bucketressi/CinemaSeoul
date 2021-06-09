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

	const [stat, setStat] = useState<number>(0);
	const [sort, setSort] = useState<number>(0);
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		fetchMovie(page, stat, sort);
	}, []);

	useEffect(() => {
		// stat과 sort는 바뀔 때마다 재구성
		fetchMovie(page, stat, sort);
	}, [stat, sort, page]);

	const handlePageChange = (e: any, pageNumber: number) => { setPage(pageNumber); };

	return (
		<div className="movie-wrap">
			<div className="movie-con">
				<div className="stat-sort-con">
					<p>선택 및 정렬</p>
					<Select className="select" label="상태" value={stat} onChange={(e: any) => setStat(e.target.value)}>
						<MenuItem value={0}>전체</MenuItem>
						<MenuItem value={1}>상영중</MenuItem>
						<MenuItem value={2}>상영예정</MenuItem>
					</Select>
					<Select className="select" label="정렬" value={sort} onChange={(e: any) => setSort(e.target.value)}>
						<MenuItem value={0}>기본</MenuItem>
						<MenuItem value={1}>평점순</MenuItem>
						<MenuItem value={2}>누적관람객순</MenuItem>
					</Select>
					<SearchTab />
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