import React, { useEffect, useState } from 'react';
import "../scss/component/_moviecard.scss";
import { SimpleMovieType } from '../Main/Type';

const MovieCard = ({image, movi_name, accu_audience, open_date, avai_age, rating} : SimpleMovieType) => {
	const [dDay, setDDay] = useState<string>("Day");
	useEffect(()=>{
		const now = new Date();
		const movieTime = new Date(`${open_date.slice(0,4)}/${open_date.slice(4,6)}/${open_date.slice(6,8)}`);
		console.log(open_date);
		console.log(movieTime)
		const time = now.getDate() - movieTime.getDate();
		if(time === 0){
			setDDay("Day");
		}else if(time <0){
			// 이미 지남
			setDDay(`+${Math.abs(time).toString()}`);
		}else{
			setDDay(`-${time.toString()}`);
		}
	}, [open_date]);

	const isImgInvalid = () => {
		return (image == undefined || image == null || image == "");
	}

	return (
		<div className="movie-card">
			<div className="movie-poster">
				<span className="age-circle">{avai_age}</span>
				<img src={isImgInvalid()?"https://i.pinimg.com/564x/38/cb/31/38cb31cee4b2da2676f1003a2fcf514d.jpg":image} alt={`poster ${movi_name}`}/>
			</div>
			<div className="movie-name">{movi_name}</div>
			<div className="info-con">
				<div>
					<div className="rating">{`평점 : ${rating}`}</div>
					<div className="open-date">{`D${dDay}`}</div>
				</div>
				<div className="audience">{`누적관람객 수 : ${accu_audience}명`}</div>
			</div>
		</div>
	);
};

export default MovieCard;