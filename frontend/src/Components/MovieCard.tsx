import React, { useEffect, useState } from 'react';
import "../scss/component/_moviecard.scss";

type Props = {
	imgSrl : string;
	movi_name : string;
	bookrecord : number;
	open_date : Date;
	avi_age : number;
}

const MovieCard = ({imgSrl, movi_name, bookrecord, open_date, avi_age} : Props) => {
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
		<div className="movie-card">
			<div className="movie-poster">
				<span className="age-circle">{avi_age}</span>
				<img src={imgSrl} alt={`poster ${movi_name}`}/>
			</div>
			<div className="movie-name">{movi_name}</div>
			<div className="info-con">
				<div>{`예매율 : ${bookrecord}%`}</div>
				<div>{`D${dDay}`}</div>
			</div>
		</div>
	);
};

export default MovieCard;