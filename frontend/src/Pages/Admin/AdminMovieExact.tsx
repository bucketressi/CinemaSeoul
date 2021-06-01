import { Button } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { PageTitle } from '../../Components';

interface MatchParams {
	movie_id: string
}

const MovieExact : React.FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
	const history = useHistory();

	const modifyMovie = () => {
		history.push(`/admin/modify/movie/${match.params.movie_id}`);
	}

	const removeMovie = () => {
		console.log("영화 삭제");
		// 영화 리스트 다시 받기
		history.goBack();
	}

	return (
		<div>
			<PageTitle title="영화 상세 페이지" isButtonVisible={true}/>
			<Button onClick={modifyMovie}>수정하기</Button>
			<Button onClick={removeMovie}>삭제하기</Button>
		</div>
	)
}

export default MovieExact;