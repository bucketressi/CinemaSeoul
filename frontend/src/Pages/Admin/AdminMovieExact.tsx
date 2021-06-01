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

	useEffect(() => {
		if(!movieListObj || !match.params.movie_id || !movieListObj[Number(match.params.movie_id)])
			return;
		setMovie(movieListObj[Number(match.params.movie_id)]);
	},[movieListObj]);

	const modifyMovie = () => {
		history.push(`/admin/modify/movie/${match.params.movie_id}`);
	}

	const removeMovie = () => {
		// 영화 리스트 다시 받기 => todo : api 해결되고 다시 하기
		// axios.delete(`${SERVER_URL}/movie/delete`, {
		// 	headers : {
		// 		TOKEN : AUTH_TOKEN
		// 	}, data: { // 서버에서 req.body.{} 로 확인할 수 있다.
		// 		movi_id : Number(match.params.movie_id)
		// 	}
		// })
		// 	.then((res) => {
		// 		console.log(res.data);
		// 	})
		// 	.catch((e) => {
		// 		errorHandler(e, true, ["", "", "해당 영화가 없습니다.", ""]);
		// 	});
		// history.push("/admin/movie");
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