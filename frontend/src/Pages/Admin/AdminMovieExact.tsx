import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ExactMovie } from '../../Components';

interface MatchParams {
	movie_id: string
}

const AdminMovieExact: React.FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
	return (
		<ExactMovie movie_id={match.params.movie_id}/>
	)
}

export default AdminMovieExact;