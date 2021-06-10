import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { Button, Checkbox, Select, MenuItem, Chip, TextField, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, InputLabel } from '@material-ui/core';
import "../../scss/pages/adminmodifymovie.scss";
import { ImgComponent, ModalComponent, PageTitle } from '../../Components';
import { useGenreCodeState, useMovieAuthCodeState, usePeopleTypeCodeState } from '../../Main/CodeModel';
import { MovieType, PeopleType, MovieCastingType, CodeType, CodeMatch, CastingType } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';
import { useHistory } from 'react-router-dom';
import { returnValidImg } from '../../Function';

interface MatchParams {
	movie_id: string
}

const AdminModifyMovie: React.FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
	// 영화 상세 페이지
	const history = useHistory();
	const AUTH_TOKEN = useTokenState();
	const genreCode = useGenreCodeState();
	const peopleTypeCode = usePeopleTypeCodeState();
	const movieAuthCode = useMovieAuthCodeState();

	const [movie, setMovie] = useState<MovieType | undefined>(undefined);

	const [name, setName] = useState<string>("");
	const [company, setCompany] = useState<string>("");
	const [age, setAge] = useState<string>("");
	const [openDate, setOpenDate] = useState<string>("");
	const [runtime, setRuntime] = useState<number>(0);
	const [content, setContent] = useState<string>("");
	const [genre, setGenre] = useState<string[]>([]);
	const [imgFile, setImgFile] = useState<File | undefined>(undefined);
	const [prevImg, setPrevImg] = useState<string>("");
	const [peopleArr, setPeopleArr] = useState<PeopleType[]>([]);
	const [cast, setCast] = useState<MovieCastingType[]>([]);
	const [peopleTypeObj, setPeopleTypeObj] = useState<CodeMatch>({});

	const handleNameChange = (e: any) => { setName(e.target.value); };
	const handleCompanyChange = (e: any) => { setCompany(e.target.value); };
	const handleAgeChange = (e: any) => { setAge(e.target.value.toString()); };
	const handleRuntimeChange = (e: any) => { 
		if(isNaN(Number(e.target.value))){
			alert("숫자를 입력해주세요.");
		} 
		setRuntime(e.target.value);
	};
	const handleOpenDateChange = (e: any) => { setOpenDate(e.target.value); };
	const handleContentChange = (e: any) => { setContent(e.target.value); };

	useEffect(() => {
		fetchExactMovie();
	}, []);

	const fetchExactMovie = () => {
		// movie의 정보 받아오기
		axios.get(`${SERVER_URL}/movie/select/${match.params.movie_id}`, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				setName(res.data.movi_name);
				setCompany(res.data.company);
				setCast(res.data.casting);
				setGenre(res.data.genre);
				setPrevImg(res.data.imageBase64);
				setContent(res.data.movi_contents);
				const date: string = res.data.open_date;
				const dateString = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
				setOpenDate(dateString);
				const age = movieAuthCode.filter((auth) => auth.code_name == res.data.avai_age);
				setAge(age[0].code_id);
			})
			.catch((e) => {
				errorHandler(e, true);
				history.goBack();
			});
	}

	/* modal */
	const [isGenreOpened, setGenreOpen] = useState<boolean>(false);
	const [isCastOpened, setCastOpen] = useState<boolean>(false);

	const openGenreModal = () => { setGenreOpen(true); };
	const openCastModal = () => { setCastOpen(true); };
	const saveMovie = () => {
		// 영화 정보 저장

		axios.put(`${SERVER_URL}/movie/update`, {
			movi_id: match.params.movie_id,
			movi_name: name,
			avai_age_code: age,
			run_time: runtime,
			company: company,
			movi_contents: content,
			open_date: openDate.split('-').join("")
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				saveImg();
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	};

	const saveImg = () => {
		if (!imgFile) {
			alert("영화 정보가 성공적으로 등록되었습니다.");
			history.goBack();
			return;
		}

		const formData = new FormData();
		formData.append("image", imgFile);

		axios.put(`${SERVER_URL}/movie/image/${match.params.movie_id}`, formData, {
			headers: {
				TOKEN: AUTH_TOKEN,
				"Content-Type": "multipart/form-data"
			}
		})
			.then((res) => {
				alert("영화 정보가 성공적으로 등록되었습니다.");
				history.goBack();
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	/* genre */
	const saveGenre = () => {
		// 영화 장르 저장
		axios.post(`${SERVER_URL}/movie/updateGenre`, {
			movi_id: match.params.movie_id,
			genre_code: genre
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				setGenreOpen(false);
			})
			.catch((e) => {
				errorHandler(e, true, ["", "", "잘못된 정보를 입력하였습니다.", ""]);
			});
	};

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

	/* cast */
	const [searchKeyword, setSearchKeyword] = useState<string>("");

	useEffect(() => {
		const obj: CodeMatch = {};
		peopleTypeCode.forEach((type) => {
			obj[Number(type.code_id)] = type.code_name;
		})
		setPeopleTypeObj(obj);
	}, [peopleTypeCode]);

	useEffect(() => {
		if (!isCastOpened)
			return;
		// cast 목록 저장
		setAllCast();
	}, [isCastOpened]);

	const setAllCast = () => {
		axios.post(`${SERVER_URL}/people/list`, {
			"page": 1,
			"amount": 30
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data || !res.data.peop_list)
					return;
				setPeopleArr(res.data.peop_list);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const saveCast = () => {
		const castingObj: CastingType[] = [];
		cast.forEach((people) => {
			castingObj.push({
				"peop_id": people.peop_id,
				"cast_type_code": people.cast_type_code
			})
		});

		axios.post(`${SERVER_URL}/movie/updateCast`, {
			"movi_id": match.params.movie_id,
			"casting": castingObj
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				setCastOpen(false);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	};

	const searchCast = () => {
		axios.post(`${SERVER_URL}/people/search`, {
			"peop_name": searchKeyword
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data)
					return;
				console.log(res.data);
				setPeopleArr(res.data);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const handleCheckCast = (event: React.ChangeEvent<{ value: unknown }>) => {
		const arr: [] = event.target.value as [];
		const lastString: string = arr[arr.length - 1] as string;
		const [id, name, typeId] = lastString.split("/");
		const newCast = cast.slice();
		newCast.push({
			peop_id: Number(id),
			peop_name: name,
			cast_type_code: typeId
		});
		setCast(newCast);
	};

	const handleRemoveCast = (e: any) => {
		let node = e.target;
		node = node.parentNode;
		if (node.tagName === "svg") {
			node = node.parentNode;
		}
		const text: string = node.children[0].innerHTML;
		const type: string = text.slice(1, 3);
		const name: string = text.slice(4);
		const typeCode = peopleTypeCode.find((code) => code.code_name == type);

		const arr = cast.slice();
		arr.splice(arr.findIndex((people) => (people.peop_name === name && people.cast_type_code === typeCode?.code_id)), 1);
		setCast(arr);
	}

	return (
		<>
			<PageTitle title="상영 중인 영화" isButtonVisible={true} />
			<div className="modify-movie-wrap">
				<div className="modify-movie-btn">
					<Button variant="outlined" color="secondary" onClick={openGenreModal}>장르 설정</Button>
					<Button variant="outlined" color="secondary" onClick={openCastModal}>출연진 설정</Button>
				</div>
				<div className="modify-movie-con">
					<div>
						<TextField
							className="movie-input"
							variant="outlined"
							placeholder="제목"
							InputLabelProps={{ shrink: true }}
							inputProps={{ maxLength: 50 }}
							label="제목"
							value={name}
							onChange={handleNameChange}
						/>
						<TextField
							className="movie-input"
							variant="outlined"
							placeholder="배급사"
							InputLabelProps={{ shrink: true }}
							inputProps={{ maxLength: 30 }}
							label="배급사"
							value={company}
							onChange={handleCompanyChange}
						/>
						<TextField
							className="movie-input"
							variant="outlined"
							placeholder="런타임"
							InputLabelProps={{ shrink: true }}
							inputProps={{ maxLength: 4 }}
							label="런타임"
							value={runtime}
							onChange={handleRuntimeChange}
						/>
						<TextField
							className="movie-input"
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
						<TextField
							className="movie-input-long"
							variant="outlined"
							placeholder="설명"
							InputLabelProps={{ shrink: true }}
							inputProps={{ maxLength: 600 }}
							label="설명"
							value={content}
							multiline={true}
							rows={9}
							onChange={handleContentChange}
						/>
						<FormControl className="movie-input">
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
					<div className="img-container">
						<div className="img-comp-container">
							<div className="menu-subtitle">기존 포스터</div>
							<img src={returnValidImg(prevImg)} alt="기존 인물 사진" />
						</div>
						<div>
							<div className="menu-subtitle">변경할 포스터</div>
							<ImgComponent setImgFile={setImgFile} />
						</div>
					</div>
					<div className="btn-con">
						<Button variant="contained" color="primary" onClick={saveMovie}>저장</Button>
					</div>
				</div>
			</div>
			<ModalComponent
				title="장르 설정"
				open={isGenreOpened}
				setOpen={setGenreOpen}
			>
				<div className="genre-modal">
					<div className="genre-con">
						<FormControl>
							<FormLabel className="search-field-title">장르</FormLabel>
							<div>
								{
									genreCode.map((genreElement) =>
										<FormControlLabel key={genreElement.code_id} value={genreElement.code_id} control={<Checkbox onChange={handleGenreChange} checked={genre.includes(genreElement.code_id)} color="primary" />} label={genreElement.code_name} />
									)
								}
							</div>
						</FormControl>
					</div>
					<Button className="save-btn" variant="contained" color="secondary" onClick={saveGenre}>장르 저장</Button>
				</div>
			</ModalComponent>
			<ModalComponent
				title="출연진 설정"
				open={isCastOpened}
				setOpen={setCastOpen}
			>
				<div className="cast-modal">
					<div className="cast-select-con">
						<div className="search-cast-con">
							<TextField value={searchKeyword} onChange={(e: any) => setSearchKeyword(e.target.value)} />
							<Button variant="contained" color="primary" onClick={searchCast}>검색</Button>
							<Button variant="contained" color="primary" onClick={setAllCast}>전체 인물 보기</Button>
							<p>검색 후 아래에서 선택하실 수 있습니다.</p>
						</div>
						<div className="cast-chip-con">
							{cast.map((peop: MovieCastingType, index: number) =>
								<Chip
									key={`${peop.cast_type_code}/${peop.peop_id}`}
									label={`[${peopleTypeObj[Number(peop.cast_type_code)]}]${peop.peop_name}`}
									className="chip-component"
									onDelete={handleRemoveCast}
								/>
							)}
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
								{peopleArr.map((people: PeopleType) => {
									const arr: React.ReactElement[] = [];
									peopleTypeCode.map((peopleType: CodeType) => {
										// 이미 있는 사람 표시 x
										if (cast.filter((peop) => (peop.peop_id == people.peop_id && peop.cast_type_code == peopleType.code_id)).length)
											return null;
										arr.push(
											<MenuItem
												key={`${people.peop_id}/${peopleType.code_id}`}
												value={`${people.peop_id}/${people.peop_name}/${peopleType.code_id}`}
											>
												{`[${peopleType.code_name}]${people.peop_name}`}
											</MenuItem>
										);
									})
									return arr;
								})}
							</Select>
						</FormControl>
					</div>
					<Button className="save-btn" variant="contained" color="secondary" onClick={saveCast}>출연진 저장</Button>
				</div>
			</ModalComponent>
		</>
	);
}

export default AdminModifyMovie;