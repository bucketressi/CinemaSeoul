import React, { useEffect, useState } from 'react';
import "../../scss/pages/movielist.scss";

import { useHistory } from 'react-router-dom';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';

import { Link } from 'react-router-dom';
import { MovieCard, SearchTab, ModalComponent, PageTitle, ImgComponent } from '../../Components';
import { SimpleMovieType } from '../../Main/Type';
import { Button, TextField, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, Select, Menu, MenuItem } from '@material-ui/core';

import { useMovieListState, useFetchMovieFunction, useTotalPageState } from '../../Main/MovieListModel';
import { useMovieAuthCodeState } from '../../Main/CodeModel';
import { Pagination } from '@material-ui/lab';

const AdminMovie = () => {
	const AUTH_TOKEN = useTokenState();
	const movieAuthCode = useMovieAuthCodeState();
	const history = useHistory();
	const fetchMovie = useFetchMovieFunction();
	const totalPage = useTotalPageState();

	const movieListData = useMovieListState();
	const [open, setOpen] = useState<boolean>(false);

	const [name, setName] = useState<string>("");
	const [company, setCompany] = useState<string>("");
	const [age, setAge] = useState<string>("");
	const [openDate, setOpenDate] = useState<string>("");
	const [runtime, setRuntime] = useState<number>(0);
	const [content, setContent] = useState<string>("");
	const [genre, setGenre] = useState<string[]>([]);
	const [imgFile, setImgFile] = useState<File | undefined>(undefined);

	/** 조건 */
	const [stat, setStat] = useState<number>(0);
	const [sort, setSort] = useState<number>(0);
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		if (location.pathname === "/movie/search") // search를 통해 왔으면 다시 fetch 안 함
			return;
		fetchMovie(page, sort, stat);
	}, []);

	useEffect(() => {
		// stat과 sort는 바뀔 때마다 재구성
		fetchMovie(page, stat, sort);
	}, [stat, sort, page]);

	const handlePageChange = (e: any, pageNumber: number) => { setPage(pageNumber); };

	useEffect(() => {
		setAge(movieAuthCode[0].code_id);
	}, [movieAuthCode]);

	const handleNameChange = (e: any) => { setName(e.target.value); };
	const handleCompanyChange = (e: any) => { setCompany(e.target.value); };
	const handleRuntimeChange = (e: any) => {
		if (isNaN(Number(e.target.value))) {
			alert("숫자를 입력해주세요.");
			return;
		}
		setRuntime(Number(e.target.value));
	};
	const handleOpenDateChange = (e: any) => { setOpenDate(e.target.value); };
	const handleContentChange = (e: any) => { setContent(e.target.value); };
	const handleAgeChange = (e: any) => { setAge(e.target.value.toString()); };

	const addMovie = () => {
		// 영화 추가 api 호출

		const formData = new FormData();
		if (imgFile) {
			formData.append("image", imgFile);
		}
		const jsonData = JSON.stringify({
			movi_name: name,
			avai_age_code: age,
			run_time: runtime,
			company: company,
			movi_contents: content,
			open_date: openDate.split("-").join("")
		});

		const blobData = new Blob([jsonData], { type: 'application/json' });
		formData.append("movie", blobData);

		axios.post(`${SERVER_URL}/movie/add`, formData, {
			headers: {
				TOKEN: AUTH_TOKEN,
				"Content-Type": "multipart/form-data"
			}
		})
			.then((res) => {
				setOpen(false);
				fetchMovie(page, sort, stat);
			})
			.catch((e) => {
				errorHandler(e, true, ["", "", "영화 생성에 실패하였습니다. 정보를 다시 확인해주세요.", ""]);
			});
	}


	return (
		<>
			<PageTitle title="영화 리스트" isButtonVisible={true} />
			<div className="movie-wrap">
				<div className="stat-sort-con">
					<div>선택 및 정렬</div>
					<Select label="상태" value={stat} onChange={(e: any) => setStat(e.target.value)}>
						<MenuItem value={0}>전체</MenuItem>
						<MenuItem value={1}>상영중</MenuItem>
						<MenuItem value={2}>상영예정</MenuItem>
					</Select>
					<Select label="정렬" value={sort} onChange={(e: any) => setSort(e.target.value)}>
						<MenuItem value={0}>기본</MenuItem>
						<MenuItem value={1}>평점순</MenuItem>
						<MenuItem value={2}>누적관람객순</MenuItem>
					</Select>
				</div>
				<div className="movie-con">
					<SearchTab />
					<div className="movie-content-con">
						<div className="movie-menu">
							<Button variant="outlined" color="primary" onClick={() => setOpen(true)}>영화 추가</Button>
						</div>
						<div className="movie-list-con">
							<div className="movie-list">
								{
									movieListData &&
									movieListData.map((movie: SimpleMovieType) => {
										return (
											<Link key={movie.movi_id} to={`/admin/movie/${movie.movi_id}`}>
												<MovieCard
													movi_id={movie.movi_id}
													imageBase64={movie.imageBase64}
													movi_name={movie.movi_name}
													accu_audience={movie.accu_audience}
													avai_age={movie.avai_age}
													open_date={movie.open_date}
													rating={movie.rating}
												/>
											</Link>
										)
									})
								}
							</div>
							<Pagination className="pagination" count={totalPage} page={page} onChange={handlePageChange} />
						</div>
					</div>
				</div>
				<ModalComponent
					open={open}
					setOpen={setOpen}
					title="영화 추가"
					button="추가"
					buttonOnClick={addMovie}
				>
					<div className="add-container">
						<div>
							<TextField variant="outlined" placeholder="제목" label="제목" inputProps={{ maxLength: 50 }} value={name} onChange={handleNameChange} />
							<TextField variant="outlined" placeholder="회사" label="회사" inputProps={{ maxLength: 20 }} value={company} onChange={handleCompanyChange} />
						</div>
						<div>
							<TextField variant="outlined" placeholder="런타임" label="런타임" inputProps={{ maxLength: 3 }} value={runtime} onChange={handleRuntimeChange} />
							<TextField variant="outlined" placeholder="설명" label="설명" inputProps={{ maxLength: 600 }} value={content} multiline={true} onChange={handleContentChange} />

						</div>
						<div>
							<div>
								<ImgComponent setImgFile={setImgFile} />
							</div>
							<div>
								<TextField
									variant="outlined"
									type="date"
									label="개봉예정일"
									InputLabelProps={{
										shrink: true,
									}}
									value={openDate}
									onChange={handleOpenDateChange}
								/>
								<FormControl>
									<FormLabel className="search-field-title">시청 가능 연령</FormLabel>
									<RadioGroup name="age" value={age} onChange={handleAgeChange}>
										{
											movieAuthCode.map((auth) =>
												<FormControlLabel key={auth.code_id} value={auth.code_id} control={<Radio color="primary" />} label={auth.code_name} />
											)
										}
									</RadioGroup>
								</FormControl>
							</div>
						</div>
					</div>
				</ModalComponent>
			</div>
		</>
	);
}
export default AdminMovie;