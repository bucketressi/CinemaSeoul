import React, { useEffect, useState } from 'react';
import "../../scss/pages/movielist.scss";

import { Link } from 'react-router-dom';
import { MovieCard, SearchTab, ModalComponent, PageTitle } from '../../Components';
import { SimpleMovieType, MovieListType } from '../../Main/Type';
import { Button, TextField, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@material-ui/core';

import {useMovieListState} from '../../Main/MovieListModel';

type ImgInfoType = {
	file: File;
	previewURL: string | ArrayBuffer | null;
}

const AdminMovie = () => {
	const movieListData = useMovieListState();

	const [movieList, setMovieList] = useState<MovieListType | undefined>(undefined);
	const [open, setOpen] = useState<boolean>(false);

	const [name, setName] = useState<string>("");
	const [company, setCompany] = useState<string>("");
	const [age, setAge] = useState<number>(0);
	const [openDate, setOpenDate] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [genre, setGenre] = useState<number>(-1);
	const [img, setImg] = useState<File | undefined>(undefined);
	const [imgInfo, setImgInfo] = useState<ImgInfoType | undefined>(undefined);

	const handleNameChange = (e: any) => { setAge(e.target.value); };
	const handleCompanyChange = (e: any) => { setAge(e.target.value); };
	const handleAgeChange = (e: any) => { setAge(Number(e.target.value)); };
	const handleOpenDateChange = (e: any) => { setOpenDate(e.target.value); };
	const handleContentChange = (e: any) => { setContent(e.target.value); };
	const handleGenreChange = (e: any) => { setGenre(Number(e.target.value)); };

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
		console.log("addMovie");
	}

	useEffect(() => {
		// 처음에 MovieData 받아오기
		setMovieList(movieListData);
	});

	
	return (
		<>
			<PageTitle title="영화 리스트" isButtonVisible={true}/>
			<div className="movie-wrap">
				<SearchTab />
				<div className="movie-content-con">
					<div className="movie-menu">
						<Button variant="outlined" color="primary" onClick={() => setOpen(true)}>영화 추가</Button>
					</div>
					<div className="movie-list-con">
						{
							movieList && movieList.movie_list &&
							movieList.movie_list.map((movie: SimpleMovieType) => {
								return (
									<Link key={movie.movi_id} to={`/admin/movie/${movie.movi_id}`}>
										<MovieCard
											image={movie.image}
											movi_name={movie.movi_name}
											rating={movie.rating}
											avi_age={movie.avi_age}
											open_date={movie.open_date}
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
							<TextField variant="outlined" placeholder="제목" onChange={handleNameChange} />
							<TextField variant="outlined" placeholder="회사" onChange={handleCompanyChange} />
						</div>
						<div>
							<TextField variant="outlined" placeholder="설명" multiline={true} onChange={handleContentChange} />
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
						</div>
						<div>
							<FormControl>
								<FormLabel className="search-field-title">시청 가능 연령</FormLabel>
								<RadioGroup name="age" value={age} onChange={handleAgeChange}>
									<FormControlLabel value={0} control={<Radio color="primary" />} label="ALL" />
									<FormControlLabel value={1} control={<Radio color="primary" />} label="12세" />
									<FormControlLabel value={2} control={<Radio color="primary" />} label="15세" />
									<FormControlLabel value={3} control={<Radio color="primary" />} label="18세" />
								</RadioGroup>
							</FormControl>
							<div>
								<div>포스터</div>
								{
									imgInfo && typeof(imgInfo.previewURL) === "string" && 
									<img src={imgInfo.previewURL} alt="포스터" />
								}
								<input type="file" onChange={uploadImage} />
							</div>
						</div>
					</div>
				</ModalComponent>
			</div>
		</>
	);
}
export default AdminMovie;