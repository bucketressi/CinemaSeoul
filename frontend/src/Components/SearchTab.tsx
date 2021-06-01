import React, { Dispatch, useState } from 'react';
import { Button, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, Checkbox } from '@material-ui/core';
import "../scss/component/_searchtab.scss";
import axios from 'axios';
import { SERVER_URL } from '../CommonVariable';
import { errorHandler } from '../Main/ErrorHandler';
import { useTokenState } from '../Main/TokenModel';

import { useMovieListDispatch } from '../Main/MovieListModel';


const SearchTab = () => {
	const setMovieList = useMovieListDispatch();
	const token = useTokenState();

	const [state, setState] = useState<number>(0);
	const [genre, setGenre] = useState<number[]>([]);
	const [age, setAge] = useState<number[]>([]);

	const handleStateChange = (e: any) => { setState(Number(e.target.value)); };
	const handleGenreChange = (e: any) => {
		const arr = genre.slice();
		if(arr.includes(e.target.value))
			return;
		arr.push(e.target.value);
		setGenre(arr);
	};
	const handleAgeChange = (e: any) => {
		const arr = age.slice();
		if(arr.includes(e.target.value))
			return;
		arr.push(e.target.value);
		setAge(arr);
	};

	const handleSearch = () => { // 검색
		console.log(state, genre, age);

		// axios.post(`${SERVER_URL}/user/login`, {
		// 	page : 1,
		// 	stat : 0,
		// 	avai_age_code : ["200002"],  //없으면 null
		// 	genre_code : ["220001"],  //없으면 null
		// 	sort : 0
		// })
		// 	.then((res) => {
		// 		setToken(res.data); // token 세팅
		// 		history.push("/main");
		// 	})
		// 	.catch((e) => {
		// 		errorHandler(e, true, ["", "", "로그인에 실패하였습니다. 아이디, 비밀번호를 확인해주세요.", ""]);
		// 	});
		// {
		// 	 //전체 : 0, 상영중  1, 상영예정 : 2
		// 	"page" : 1,
		// 	"stat" : 0,
		// 	"avai_age_code" : ["200002"],  //없으면 null
		// 	"genre_code" : ["220001"],  //없으면 null
		// 	 //기본(id순) : 0, 평점순 : 1, 누적관람객순 : 2
		// 	"sort" : 0
		// }
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
					<RadioGroup name="genre" value={genre}>
						{
							// todo : code에서 가져와서 쓰기
						}
						<FormControlLabel value={-1} control={<Checkbox onChange={handleGenreChange} color="primary" />} label="전체" />
						<FormControlLabel value={0} control={<Checkbox onChange={handleGenreChange} color="primary" />} label="미지정" />
						<FormControlLabel value={1} control={<Checkbox onChange={handleGenreChange} color="primary" />} label="액션" />
						<FormControlLabel value={2} control={<Checkbox onChange={handleGenreChange} color="primary" />} label="멜로" />
						<FormControlLabel value={3} control={<Checkbox onChange={handleGenreChange} color="primary" />} label="드라마" />
						<FormControlLabel value={4} control={<Checkbox onChange={handleGenreChange} color="primary" />} label="코미디" />
						<FormControlLabel value={5} control={<Checkbox onChange={handleGenreChange} color="primary" />} label="무협" />
						<FormControlLabel value={6} control={<Checkbox onChange={handleGenreChange} color="primary" />} label="SF" />
						<FormControlLabel value={7} control={<Checkbox onChange={handleGenreChange} color="primary" />} label="에로" />
						<FormControlLabel value={8} control={<Checkbox onChange={handleGenreChange} color="primary" />} label="애니메이션" />
						<FormControlLabel value={9} control={<Checkbox onChange={handleGenreChange} color="primary" />} label="공포" />
					</RadioGroup>
				</FormControl>
				<FormControl>
					<FormLabel className="search-field-title">시청 가능 연령</FormLabel>
					<RadioGroup name="age" value={age} onChange={handleAgeChange}>
						<FormControlLabel value={0} control={<Checkbox onChange={handleAgeChange} color="primary" />} label="ALL" />
						<FormControlLabel value={1} control={<Checkbox onChange={handleAgeChange} color="primary" />} label="12세" />
						<FormControlLabel value={2} control={<Checkbox onChange={handleAgeChange} color="primary" />} label="15세" />
						<FormControlLabel value={3} control={<Checkbox onChange={handleAgeChange} color="primary" />} label="18세" />
					</RadioGroup>
				</FormControl>
			</div>
		</div>
	);
}

export default SearchTab;