import React, { useEffect, useState } from 'react';
import "../../scss/pages/movielist.scss";

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';

import { Link } from 'react-router-dom';
import { MovieCard, SearchTab, ModalComponent, PageTitle } from '../../Components';
import { SimpleMovieType, MovieListType } from '../../Main/Type';
import { Button, TextField, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@material-ui/core';

import { useMovieListState, useFetchMovieFunction } from '../../Main/MovieListModel';
import { useMovieAuthCodeState } from '../../Main/CodeModel';

type ImgInfoType = {
	file: File;
	previewURL: string | ArrayBuffer | null;
}

const AdminMovie = () => {
	const AUTH_TOKEN = useTokenState();
	const movieAuthCode = useMovieAuthCodeState();
	const fetchMovie = useFetchMovieFunction();

	const movieListData = useMovieListState();
	const [open, setOpen] = useState<boolean>(false);

	const [name, setName] = useState<string>("");
	const [company, setCompany] = useState<string>("");
	const [age, setAge] = useState<string>("");
	const [openDate, setOpenDate] = useState<string>("");
	const [runtime, setRuntime] = useState<number>(0);
	const [content, setContent] = useState<string>("");
	const [genre, setGenre] = useState<string[]>([]);
	const [img, setImg] = useState<File | undefined>(undefined);
	const [imgInfo, setImgInfo] = useState<ImgInfoType | undefined>(undefined);

	useEffect(() => {
		setAge(movieAuthCode[0].code_id);
	}, [movieAuthCode]);

	const handleNameChange = (e: any) => { setName(e.target.value); };
	const handleCompanyChange = (e: any) => { setCompany(e.target.value); };
	const handleRuntimeChange = (e: any) => {
		if(isNaN(Number(e.target.value))){
			alert("숫자를 입력해주세요.");
			return;
		}
		setRuntime(Number(e.target.value));
	};
	const handleOpenDateChange = (e: any) => {
		setOpenDate(e.target.value);
	};
	const handleContentChange = (e: any) => { setContent(e.target.value); };
	const handleGenreChange = (e: any) => {
		const arr = genre.slice();
		const codeStr = e.target.value.toString();
		if (arr.includes(codeStr)) {
			arr.splice(arr.findIndex(code => code == codeStr), 1);
			setGenre(arr);
			return;
		}
		arr.push(codeStr);
		setGenre(arr);
	};
	const handleAgeChange = (e: any) => {
		setAge(e.target.value.toString());
	};
	const uploadImage = (e: any) => {
		setImg(e.target.files[0]);
		const reader = new FileReader();
		reader.onloadend = () => {
			setImgInfo({
				file: e.target.files[0],
				previewURL: reader.result
			})
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	const addMovie = () => {
		// 영화 추가 api 호출
		axios.post(`${SERVER_URL}/movie/add`, {
			movi_name : name,
			avai_age_code : age,
			run_time : runtime,
			company : company,
			movi_contents : content,
			open_date : openDate.split("-").join(""),
			image : null
		}, {
			headers : {
				TOKEN : AUTH_TOKEN
			}
		})
			.then((res) => {
				fetchMovie();
				setOpen(false);
			})
			.catch((e) => {
				errorHandler(e, true, ["", "", "영화 생성에 실패하였습니다. 정보를 다시 확인해주세요.", ""]);
			});
	}


	return (
		<>
			<PageTitle title="영화 리스트" isButtonVisible={true} />
			<div className="movie-wrap">
				<SearchTab />
				<div className="movie-content-con">
					<div className="movie-menu">
						<Button variant="outlined" color="primary" onClick={() => setOpen(true)}>영화 추가</Button>
					</div>
					<div className="movie-list-con">
						{
							movieListData &&
							movieListData.map((movie: SimpleMovieType) => {
								return (
									<Link key={movie.movi_id} to={`/admin/movie/${movie.movi_id}`}>
										<MovieCard
											movi_id = {movie.movi_id}
											image={movie.image}
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
							<TextField variant="outlined" placeholder="제목" inputProps={{ maxLength: 50 }} value={name} onChange={handleNameChange} />
							<TextField variant="outlined" placeholder="회사" inputProps={{ maxLength: 20 }} value={company} onChange={handleCompanyChange} />
						</div>
						<div>
							<TextField variant="outlined" placeholder="런타임" inputProps={{ maxLength: 4 }} value={runtime} onChange={handleRuntimeChange} />
							<TextField variant="outlined" placeholder="설명" inputProps={{ maxLength: 600 }} value={content} multiline={true} onChange={handleContentChange} />

						</div>
						<div>
							<div>
								<div>포스터</div>
								{
									imgInfo && typeof (imgInfo.previewURL) === "string" && // 없으면 priview 포스터 보여주기
									<img src={imgInfo.previewURL} alt="포스터" />
								}
								<input type="file" onChange={uploadImage} />
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