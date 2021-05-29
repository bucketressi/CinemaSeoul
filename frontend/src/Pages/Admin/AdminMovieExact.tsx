import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Button, Checkbox, Select, MenuItem, Chip, TextField, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, InputLabel } from '@material-ui/core';
import "../../scss/pages/adminmovieexact.scss";
import { ModalComponent } from '../../Components';

interface MatchParams {
	movie_id: string
}

type ImgInfoType = {
	file: File,
	previewURL: string | ArrayBuffer | null
}

const genreArr = ["액션", "로맨스", "애니메이션", "공포", "스릴러"];
const peopleArr = ["우희은", "엄현식", "고다현", "공유", "심은하", "손예진", "김태희"];

const AdminMovieExact: React.FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
	// 영화 상세 페이지
	const history = useHistory();

	const [name, setName] = useState<string>("");
	const [company, setCompany] = useState<string>("");
	const [age, setAge] = useState<number>(0);
	const [openDate, setOpenDate] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [img, setImg] = useState<File | undefined>(undefined);
	const [imgInfo, setImgInfo] = useState<ImgInfoType | undefined>(undefined);
	const [genre, setGenre] = useState<boolean[]>([]);
	const [cast, setCast] = useState<string[]>([]);

	const handleNameChange = (e: any) => { setAge(e.target.value); };
	const handleCompanyChange = (e: any) => { setAge(e.target.value); };
	const handleAgeChange = (e: any) => { setAge(Number(e.target.value)); };
	const handleOpenDateChange = (e: any) => { setOpenDate(e.target.value); };
	const handleContentChange = (e: any) => { setContent(e.target.value); };
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

	useEffect(() => {
		if (img === undefined)
			return;
		const reader = new FileReader();
		reader.onloadend = () => {
			setImgInfo({
				file: img,
				previewURL: reader.result
			})
		};
		reader.readAsDataURL(img);
	}, [img]);

	useEffect(() => {
		// 초기화 시 url로 넘어온 id로 정보 셋
		// api로 정보 받아오기
		console.log(match.params.movie_id);
	}, [match.params]);

	useEffect(() => {
		// 초기화 시 genre 세팅
		const arr = [];
		for (let i = 0; i < genreArr.length; i++)
			arr.push(false);
		setGenre(arr);
	}, []);


	/* modal */
	const [isGenreOpened, setGenreOpen] = useState<boolean>(false);
	const [isCastOpened, setCastOpen] = useState<boolean>(false);

	const openGenreModal = () => { setGenreOpen(true); };
	const openCastModal = () => { setCastOpen(true); };
	const saveMovie = () => {
		console.log("save movie");
		// api로 movie 정보 저장
		history.push("/admin/movie");
	};

	const saveGenre = () => {
		console.log("save genre");
		setGenreOpen(false);
	};

	const saveCast = () => {
		console.log("save cast");
		setCastOpen(false);
	};

	const handleCheckCast = (event: React.ChangeEvent<{ value: unknown }>) => {
		setCast(event.target.value as string[]);
	};
	const handleRemoveCast = (e : any) => {
		let node = e.target;
		node = node.parentNode;
		if(node.tagName === "svg"){
			node = node.parentNode;
		}
		const name = node.children[0].innerHTML;

		const arr = cast.slice();
		arr.splice(arr.findIndex((people)=>name===people), 1);
		setCast(arr);
	}

	const handleCheckGenre = (e: any, idx: number) => {
		const arr = genre.slice();
		arr[idx] = e.target.checked;
		setGenre(arr);
	}

	const Genre = (isChecked: boolean, idx: number) => (
		<div className="genre-single">
			<Checkbox
				color="primary"
				checked={isChecked}
				onChange={(e: any) => handleCheckGenre(e, idx)}
			/>
			<div className="title">{genreArr[idx]}</div>
		</div>
	);


	return (
		<div>
			<div className="page-title">영화 수정 페이지</div>
			<div className="add-container page-width">
				<div>
					<TextField variant="outlined" placeholder="제목" value={name} onChange={handleNameChange} />
					<TextField variant="outlined" placeholder="회사" value={company} onChange={handleCompanyChange} />
				</div>
				<div>
					<TextField variant="outlined" placeholder="설명" value={content} multiline={true} onChange={handleContentChange} />
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
							imgInfo && typeof (imgInfo.previewURL) === "string" &&
							<img src={imgInfo.previewURL} alt="포스터" />
						}
						<input type="file" onChange={uploadImage} />
					</div>
				</div>
			</div>
			<div className="button-con">
				<Button className="save-btn" variant="contained" color="secondary" onClick={saveMovie}>저장</Button>
				<Button variant="contained" color="primary" onClick={openGenreModal}>장르 설정</Button>
				<Button variant="contained" color="primary" onClick={openCastModal}>출연진 설정</Button>
			</div>
			<ModalComponent
				title="장르 설정"
				open={isGenreOpened}
				setOpen={setGenreOpen}
			>
				<div className="genre-con">
					{
						genre.map((isChecked, idx) => Genre(isChecked, idx))
					}
				</div>
				<Button className="save-btn" variant="contained" color="secondary" onClick={saveGenre}>장르 저장</Button>
			</ModalComponent>
			<ModalComponent
				title="출연진 설정"
				open={isCastOpened}
				setOpen={setCastOpen}
			>
				<div className="cast-select-con">
					<div className="cast-chip-con">
						{cast.map((name : string) => (
							<Chip
								key={name}
								label={name}
								className="chip-component"
								onDelete={handleRemoveCast}
							/>
						))}
					</div>
					<FormControl>
						<InputLabel id="select-label">출연진</InputLabel>
						<Select
							labelId="select-label"
							id="demo-mutiple-chip"
							multiple
							value={cast}
							onChange={handleCheckCast}
							MenuProps={{
								PaperProps: {
									style: {
										maxHeight: 48 * 4.5 + 8,
										width: 250,
									},
								},
							}}
							
						>
							{peopleArr.map((name: string) => (
								<MenuItem key={name} value={name}>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<Button className="save-btn" variant="contained" color="secondary" onClick={saveCast}>출연진 저장</Button>
			</ModalComponent>
		</div>
	);
}

export default AdminMovieExact;