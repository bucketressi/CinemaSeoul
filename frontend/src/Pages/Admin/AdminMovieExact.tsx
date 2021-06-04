import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { PageTitle } from '../../Components';
import { useMovieListObjState, useFetchMovieFunction } from '../../Main/MovieListModel';
import { SimpleMovieType } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';

interface MatchParams {
	movie_id: string
}

const MovieExact : React.FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
	const history = useHistory();
	const fetchMovie = useFetchMovieFunction();
	const movieListObj = useMovieListObjState();
	const AUTH_TOKEN = useTokenState();

	const [movie, setMovie] = useState<SimpleMovieType| undefined>(undefined);

	useEffect(()=> {
		fetchExactMovie();
	},[]);

	const fetchExactMovie = () => {
		// movie의 정보 받아오기
		axios.get(`${SERVER_URL}/movie/${match.params.movie_id}`,{
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				console.log(res.data);
				setMovie(res.data);
			})
			.catch((e) => {
				errorHandler(e, true, ["", "", "해당 영화가 없습니다.", ""]);
				history.goBack();
			});
	}

	const modifyMovie = () => {
		history.push(`/admin/modify/movie/${match.params.movie_id}`);
	}

	const removeMovie = () => {
		// 영화 리스트 다시 받기 => todo : api 해결되고 다시 하기
		if(!confirm(`[${movie?.movi_name}] 영화를 정말로 삭제할까요?`))
			return;
		axios.delete(`${SERVER_URL}/movie/delete/${match.params.movie_id}`, {
			headers : {
				TOKEN : AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("삭제되었습니다.");
				fetchMovie();
				history.push("/admin/movie");
			})
			.catch((e) => {
				errorHandler(e, true, ["", "", "해당 영화가 없습니다.", ""]);
			});
	}

	return (
		<div>
			<PageTitle title="영화 상세 페이지" isButtonVisible={true}/>
			<Button onClick={modifyMovie}>수정하기</Button>
			<Button onClick={removeMovie}>삭제하기</Button>
			{
				movie &&
				<div>{movie.movi_name}</div>
			}
		</div>
	)
}

export default MovieExact;