import React, { useEffect, useState } from 'react';
import "../scss/component/_moviecard.scss";
import { SimpleMovieType } from '../Main/Type';
import { returnValidImg } from '../Function';

const MovieCard = ({movi_id, imageBase64, movi_name, accu_audience, open_date, avai_age, rating} : SimpleMovieType) => {
	const [dDay, setDDay] = useState<string>("Day");
	useEffect(()=>{
		if(open_date == undefined)
			return;
		const now = new Date();
		const movieTime = new Date(`${open_date.slice(0,4)}/${open_date.slice(4,6)}/${open_date.slice(6,8)}`);
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

	return (
		<div className="movie-card">
			<div className="movie-poster">
				<span className="age-circle">{avai_age?.substr(0,3)}</span>
				<img src={returnValidImg(imageBase64)} alt={`poster ${movi_name}`}/>
			</div>
			<div className="movie-name">{movi_name}</div>
			{
				rating === undefined &&
				<div className="info-con">
					<div>
						<div className="rating">{`평점 : ${rating}`}</div>
						<div className="open-date">{`D${dDay}`}</div>
					</div>
					<div className="audience">{`누적관람객 수 : ${accu_audience}명`}</div>
				</div>
			}
		</div>
	);
};

export default MovieCard;