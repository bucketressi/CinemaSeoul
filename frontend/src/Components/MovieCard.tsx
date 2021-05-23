import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../scss/component/_moviecard.scss";
import { SimpleMovieType } from '../Main/Type';

const MovieCard = ({movi_id, image, movi_name, rating, open_date, avi_age} : SimpleMovieType) => {
	const [dDay, setDDay] = useState<string>("Day");
	useEffect(()=>{
		const now = new Date();
		console.log(now.getDate());
		const time = now.getDate() - open_date.getDate();
		if(time === 0){
			setDDay("Day");
		}else{
			setDDay(time.toString());
		}
	}, [open_date]);

	return (
		<Link to={`/movie/${movi_id}`}>
			<div className="movie-card">
				<div className="movie-poster">
					<span className="age-circle">{avi_age}</span>
					<img src={image} alt={`poster ${movi_name}`}/>
				</div>
				<div className="movie-name">{movi_name}</div>
				<div className="info-con">
					<div>{`예매율 : ${rating}%`}</div>
					<div>{`D${dDay}`}</div>
				</div>
			</div>
		</Link>
	);
};

export default MovieCard;