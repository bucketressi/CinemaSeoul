import React, { useEffect, useState } from 'react';
import "../scss/component/_moviecard.scss";
import { SimpleMovieType } from '../Main/Type';

const MovieCard = ({image, movi_name, rating, open_date, avi_age} : SimpleMovieType) => {
	const [dDay, setDDay] = useState<string>("Day");
	useEffect(()=>{
		const now = new Date();
		const time = now.getDate() - open_date.getDate();
		if(time === 0){
			setDDay("Day");
		}else if(time <0){
			// 이미 지남
			setDDay(`+${Math.abs(time).toString()}`);
		}else{
			setDDay(`-${time.toString()}`);
		}
	}, [open_date]);

	return (
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
	);
};

export default MovieCard;