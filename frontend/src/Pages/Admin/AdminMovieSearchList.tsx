import React, { useEffect, useState } from 'react';
import { SimpleMovieType } from '../../Main/Type';
import { Link } from 'react-router-dom';
import { MovieCard } from '../../Components';
import { useMovieListState, useMovieListDispatch } from '../../Main/MovieListModel';
import { Pagination } from '@material-ui/lab';
import { usePeopleTypeCodeState } from '../../Main/CodeModel';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';

import { RouteComponentProps } from 'react-router-dom';

interface MatchParams {
	keyword: string,
	type: string
}

const AdminMovieSearchList : React.FunctionComponent<RouteComponentProps<MatchParams>> = ({match}) => {
	const AUTH_TOKEN = useTokenState();
	const peopleType = usePeopleTypeCodeState();
	const movieListData = useMovieListState();
	const setMovieList = useMovieListDispatch();
	const [totalPage, setTotalPage] = useState<number>(1);
	const [page, setPage] = useState<number>(1);

	const [keyword, setKeyword] = useState<string>("");
	const [type, setType] = useState<string>("");

	const handlePageChange = (e: any, pageNumber: number) => { setPage(pageNumber); };

	useEffect(()=> {
		searchMovie();
	}, [page]);

	useEffect(()=> {
		console.log(match.params);
		setKeyword(match.params.keyword);
		setType(match.params.type);
	}, [match.params.keyword, match.params.type]);

	useEffect(()=> {
		searchMovie();
	}, [keyword, type]);

	const searchMovie = () => {
		if(!keyword || !type)
			return;

		console.log(keyword, type);
		// 검색 시 type을 null, "감독", "배우"로 mapping
		axios.post(`${SERVER_URL}/movie/search`, {
			"page" : page,             
			"name" : keyword === "null"?"":keyword,
			"cast_type_code" : type === "0" ? null : peopleType[Number(type)-1].code_id
		}, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data || !res.data.movi_list)
					return;
				setMovieList(res.data.movi_list);
				setTotalPage(res.data.totalpage);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<div className="movie-content-con">
			<div className="movie-list-con">
				<div className="movie-list">
					{
						movieListData &&
						movieListData.map((movie: SimpleMovieType) => {
							return (
								<Link key={movie.movi_id} to={`/admin/movie/${movie.movi_id}`}>
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
	);
}

export default AdminMovieSearchList;