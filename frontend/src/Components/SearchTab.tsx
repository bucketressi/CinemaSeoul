import React, { Dispatch, useState } from 'react';
import { Button, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@material-ui/core';
import "../scss/component/_searchtab.scss";

import { useMovieListDispatch } from '../Main/MovieListModel';
import { useHistory } from 'react-router-dom';

const changedMovieData = {
	movie_list: [
		{
			movi_id: 3,
			movi_name: "파이프라인",
			rating: 4.6,
			avi_age: 12,
			open_date: new Date("2021/05/23"),
			image: "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17374_103_1.jpg"
		}, {
			movi_id: 4,
			movi_name: "크루엘라",
			rating: 3.6,
			avi_age: 15,
			open_date: new Date("2021/06/20"),
			image: "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17387_103_1.jpg"
		}
	],
	page: 1,
	totalpage: 1,
	amount: 2
};

const SearchTab = () => {
	const setMovieList = useMovieListDispatch();
	const history = useHistory();

	const [state, setState] = useState<number>(0);
	const [genre, setGenre] = useState<number>(-1);
	const [age, setAge] = useState<number>(0);
	
	const handleStateChange = (e : any ) => { setState(Number(e.target.value)); };
	const handleGenreChange = (e : any ) => { setGenre(Number(e.target.value)); };
	const handleAgeChange = (e : any ) => { setAge(Number(e.target.value)); };

	const handleSearch = () => {
		setMovieList(changedMovieData);
		history.push("/admin/movie");
	};

	return (
		<div className="search-tab">
			<div className="title">
				<p>검색 조건</p>
				<Button variant="contained" color="inherit" onClick={handleSearch}>검색</Button>
			</div>
			<div className="search-condi-con">
				<FormControl>
					<FormLabel className="search-field-title">상태</FormLabel>
					<RadioGroup name="state" value={state} onChange={handleStateChange}>
						<FormControlLabel value={0} control={<Radio color="primary" />} label="전체" />
						<FormControlLabel value={1} control={<Radio color="primary" />} label="상영 예정" />
						<FormControlLabel value={2} control={<Radio color="primary" />} label="상영 중" />
					</RadioGroup>
				</FormControl>
				<FormControl>
					<FormLabel className="search-field-title">장르</FormLabel>
					<RadioGroup name="genre" value={genre} onChange={handleGenreChange}>
						{
							// todo : code에서 가져와서 쓰기
						}
						<FormControlLabel value={-1} control={<Radio color="primary" />} label="전체" />
						<FormControlLabel value={0} control={<Radio color="primary" />} label="미지정" />
						<FormControlLabel value={1} control={<Radio color="primary" />} label="액션" />
						<FormControlLabel value={2} control={<Radio color="primary" />} label="멜로" />
						<FormControlLabel value={3} control={<Radio color="primary" />} label="드라마" />
						<FormControlLabel value={4} control={<Radio color="primary" />} label="코미디" />
						<FormControlLabel value={5} control={<Radio color="primary" />} label="무협" />
						<FormControlLabel value={6} control={<Radio color="primary" />} label="SF" />
						<FormControlLabel value={7} control={<Radio color="primary" />} label="에로" />
						<FormControlLabel value={8} control={<Radio color="primary" />} label="애니메이션" />
						<FormControlLabel value={9} control={<Radio color="primary" />} label="공포" />
					</RadioGroup>
				</FormControl>
				<FormControl>
					<FormLabel className="search-field-title">시청 가능 연령</FormLabel>
					<RadioGroup name="age" value={age} onChange={handleAgeChange}>
						<FormControlLabel value={0} control={<Radio color="primary" />} label="ALL" />
						<FormControlLabel value={1} control={<Radio color="primary" />} label="12세" />
						<FormControlLabel value={2} control={<Radio color="primary" />} label="15세" />
						<FormControlLabel value={3} control={<Radio color="primary" />} label="18세" />
					</RadioGroup>
				</FormControl>
			</div>
		</div>
	);
}

export default SearchTab;