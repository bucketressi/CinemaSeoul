import React, { Dispatch, useEffect, useState } from 'react';
import { Button, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, Checkbox, Select, MenuItem } from '@material-ui/core';
import "../scss/component/_searchtab.scss";
import axios from 'axios';
import { SERVER_URL } from '../CommonVariable';
import { errorHandler } from '../Main/ErrorHandler';
import { useTokenState } from '../Main/TokenModel';
import { useGenreCodeState, useMovieAuthCodeState } from '../Main/CodeModel';
import { useMovieListDispatch } from '../Main/MovieListModel';

type Props = {
	page : number
}

const SearchTab = ({ page } : Props) => {
	const setMovieList = useMovieListDispatch();
	const token = useTokenState();
	const genreCode = useGenreCodeState();
	const movieAuthCode = useMovieAuthCodeState();

	const [sort, setSort] = useState<number>(0);
	const [state, setState] = useState<number>(0);
	const [genre, setGenre] = useState<string[]>([]);
	const [age, setAge] = useState<string[]>([]);

	useEffect(() => {
		// page가 바뀌거나 정렬이 바뀌면 자동 search
		handleSearch();
	}, [page, sort]);

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
		axios.post(`${SERVER_URL}/movie/list`, {
			page: page,
			stat: state,
			avai_age_code: age.length === 0 ? null : age,  //없으면 null
			genre_code: genre.length === 0 ? null : genre,  //없으면 null
			sort: sort,
			amount: 9
		})
			.then((res) => {
				if(!res.data || !res.data.movi_list)
					return;
				setMovieList(res.data.movi_list);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	};

	return (
		<div className="search-tab">
			<div className="title">
				<p>검색 조건</p>
				<Button variant="contained" color="inherit" onClick={handleSearch}>검색</Button>
			</div>
			<div className="search-condi-con">
				<div>정렬</div>
				<Select className="select" label="정렬" value={sort} onChange={(e: any) => setSort(e.target.value)}>
					<MenuItem value={0}>기본</MenuItem>
					<MenuItem value={1}>평점순</MenuItem>
					<MenuItem value={2}>누적관람객순</MenuItem>
				</Select>
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