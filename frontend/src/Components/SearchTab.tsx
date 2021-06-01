import React, { Dispatch, useState } from 'react';
import { Button, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, Checkbox } from '@material-ui/core';
import "../scss/component/_searchtab.scss";
import axios from 'axios';
import { SERVER_URL } from '../CommonVariable';
import { errorHandler } from '../Main/ErrorHandler';
import { useTokenState } from '../Main/TokenModel';
import { useGenreCodeState, useMovieAuthCodeState } from '../Main/CodeModel';
import { useMovieListDispatch } from '../Main/MovieListModel';


const SearchTab = () => {
	const setMovieList = useMovieListDispatch();
	const token = useTokenState();
	const genreCode = useGenreCodeState();
	const movieAuthCode = useMovieAuthCodeState();

	const [state, setState] = useState<number>(0);
	const [genre, setGenre] = useState<number[]>([]);
	const [age, setAge] = useState<number[]>([]);

	const handleStateChange = (e: any) => { setState(Number(e.target.value)); };
	const handleGenreChange = (e: any) => {
		const arr = genre.slice();
		const codeStr = e.target.value.toString();
		if (arr.includes(codeStr)){
			arr.splice(arr.findIndex(code => code == codeStr),1);
			setGenre(arr);
			return;
		}
		arr.push(codeStr);
		setGenre(arr);
	};

	const handleAgeChange = (e: any) => {
		const arr = age.slice();
		const codeStr = e.target.value.toString();
		if (arr.includes(codeStr)){
			arr.splice(arr.findIndex(code => code == codeStr),1);
			setAge(arr);
			return;
		}
		arr.push(codeStr);
		setAge(arr);
	};

	const handleSearch = () => { // 검색
		console.log(age, genre);
		axios.post(`${SERVER_URL}/movie/list`, {
			page: 1,
			stat: 0,
			avai_age_code: age.length === 0 ? null : age,  //없으면 null
			genre_code: genre.length === 0 ? null : genre,  //없으면 null
			sort: 0
		})
			.then((res) => {
				if(!res.data || !res.data.movi_list)
					return;
				setMovieList(res.data.movi_list);
				console.log(res.data.movi_list);
			})
			.catch((e) => {
				errorHandler(e, true, ["", "", "조건이 잘못 입력되었습니다.", ""]);
			});
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
							genreCode.map((genre) =>
								<FormControlLabel key={genre.code_id} value={genre.code_id} control={<Checkbox onChange={handleGenreChange} color="primary" />} label={genre.code_name} />
							)
						}
					</RadioGroup>
				</FormControl>
				<FormControl>
					<FormLabel className="search-field-title">시청 가능 연령</FormLabel>
					<RadioGroup name="age" value={age}>
						{
							movieAuthCode.map((auth) =>
								<FormControlLabel key={auth.code_id} value={auth.code_id} control={<Checkbox onChange={handleAgeChange} color="primary" />} label={auth.code_name} />
							)
						}
					</RadioGroup>
				</FormControl>
			</div>
		</div>
	);
}

export default SearchTab;