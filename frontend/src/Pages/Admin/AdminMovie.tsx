import React, { useState } from 'react';
import "../../scss/pages/movielist.scss";

import { Link } from 'react-router-dom';
import { MovieCard, SearchTab, ModalComponent } from '../../Components';
import { SimpleMovieType } from '../../Main/Type';
import { Button, TextField, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@material-ui/core';

const AdminMovie = () => {
	const MovieData = {
		movie_list: [
			{
				movi_id: 1,
				movi_name: "귀멸의 칼날",
				rating: 4.8,
				avi_age: 15,
				open_date: new Date("2021/05/30"),
				image: "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202101/16908_103_1.jpg"
			}, {
				movi_id: 2,
				movi_name: "보이저스",
				rating: 4.6,
				avi_age: 19,
				open_date: new Date("2021/06/03"),
				image: "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17322_103_1.jpg"
			}, {
				movi_id: 3,
				movi_name: "보이저스",
				rating: 4.6,
				avi_age: 19,
				open_date: new Date("2021/06/03"),
				image: "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17322_103_1.jpg"
			}, {
				movi_id: 4,
				movi_name: "보이저스",
				rating: 4.6,
				avi_age: 19,
				open_date: new Date("2021/06/03"),
				image: "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17322_103_1.jpg"
			}
		],
		page: 1,
		totalpage: 1,
		amount: 2
	};
	const [open, setOpen] = useState<boolean>(false);

	const [name, setName] = useState<string>("");
	const [company, setCompany] = useState<string>("");
	const [age, setAge] = useState<number>(0);
	const [openDate, setOpenDate] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [genre, setGenre] = useState<number>(-1);

	const handleNameChange = (e: any) => { setAge(e.target.value); };
	const handleCompanyChange = (e: any) => { setAge(e.target.value); };
	const handleAgeChange = (e: any) => { setAge(Number(e.target.value)); };
	const handleOpenDateChange = (e: any) => { setOpenDate(e.target.value); };
	const handleContentChange = (e: any) => { setContent(e.target.value); };
	const handleGenreChange = (e : any ) => { setGenre(Number(e.target.value)); };

	return (
		<div className="movie-wrap">
			<SearchTab />
			<div className="movie-content-con">
				<div className="movie-menu">
					<Button variant="outlined" color="primary" onClick={() => setOpen(true)}>영화 추가</Button>
				</div>
				<div className="movie-list-con">
					{
						MovieData.movie_list.map((movie: SimpleMovieType) => {
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
					</div>
					<div>
						casting
					</div>
					<div>
						img
					</div>
				</div>
			</ModalComponent>
		</div>
	);
}
export default AdminMovie;