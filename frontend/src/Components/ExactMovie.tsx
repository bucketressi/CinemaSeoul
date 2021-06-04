import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { PageTitle, ModalComponent } from '../Components';
import { useAdminState } from '../Main/UserModel';
import { useGenreCodeState, usePeopleTypeCodeState } from '../Main/CodeModel';
import { useFetchMovieFunction } from '../Main/MovieListModel';
import { MovieType, CodeMatch, CodeType, PeopleType, PeopleExactType } from '../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../CommonVariable';
import { errorHandler } from '../Main/ErrorHandler';
import { useTokenState } from '../Main/TokenModel';
import "../scss/pages/movieexact.scss";

type Props = {
	movie_id : string
}

const MovieExact = ({ movie_id } : Props) => {
	const history = useHistory();
	const fetchMovie = useFetchMovieFunction();
	const AUTH_TOKEN = useTokenState();
	const genreCode = useGenreCodeState();
	const peopleTypeCode = usePeopleTypeCodeState();
	const admin = useAdminState();

	const [movie, setMovie] = useState<MovieType | undefined>(undefined);
	const [genreCodeObj, setGenreCodeObj] = useState<CodeMatch>({});
	const [peopleCodeObj, setPeopleCodeObj] = useState<CodeMatch>({});

	/* 감독과 배우 따로 표시 */
	const [director, setDirector] = useState<PeopleType[]>([]);
	const [actor, setActor] = useState<PeopleType[]>([]);

	/* 인물 modal */
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [selectedPeople, setSelectedPeople] = useState<PeopleExactType | undefined>(undefined);

	useEffect(() => { fetchExactMovie() }, []);

	useEffect(() => {
		if (!movie?.casting)
			return;
		const directorTmp: PeopleType[] = [];
		const actorTmp: PeopleType[] = [];

		movie.casting.forEach((cast) => {
			const type = peopleCodeObj[Number(cast.cast_type_code)];
			if (!type)
				return;
			switch (type) {
			case "감독": directorTmp.push(cast); break;
			case "배우": actorTmp.push(cast); break;
			}
		})

		setDirector(directorTmp);
		setActor(actorTmp);
	}, [movie]);

	useEffect(() => {
		const obj: CodeMatch = {};
		genreCode.forEach((genre: CodeType) => {
			obj[Number(genre.code_id)] = genre.code_name;
		})
		setGenreCodeObj(obj);
	}, [genreCode]);

	useEffect(() => {
		const obj: CodeMatch = {};
		peopleTypeCode.forEach((people: CodeType) => {
			obj[Number(people.code_id)] = people.code_name;
		})
		setPeopleCodeObj(obj);
	}, [genreCode]);

	const fetchExactMovie = () => {
		// movie의 정보 받아오기
		axios.get(`${SERVER_URL}/movie/${movie_id}`, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				setMovie(res.data);
				console.log(res.data);
			})
			.catch((e) => {
				errorHandler(e, true, ["", "", "해당 영화가 없습니다.", ""]);
				history.goBack();
			});
	}

	const modifyMovie = () => {
		history.push(`/admin/modify/movie/${movie_id}`);
	}

	const removeMovie = () => {
		// 영화 리스트 다시 받기 => todo : api 해결되고 다시 하기
		if (!confirm(`[${movie?.movi_name}] 영화를 정말로 삭제할까요?`))
			return;

		axios.delete(`${SERVER_URL}/movie/delete/${movie_id}`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("삭제되었습니다.");
				fetchMovie();
				history.push("/admin/movie");
			})
			.catch((e) => {
				errorHandler(e, true, ["", "", "해당 영화가 없습니다.", ""]);
			});
	}

	const handlePeopleClick = (peop_id : number) => {
		// api 호출해서 인물 정보 받아오기
		axios.get(`${SERVER_URL}/people/${peop_id}`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				setSelectedPeople(res.data);
				setModalOpen(true);
			})
			.catch((e) => {
				errorHandler(e, true);
			});

	}

	return (
		<div className="movie-exact-con">
			<PageTitle title="영화 상세 페이지" isButtonVisible={true} />
			{
				admin !== undefined &&
				<div className="btn-con">
					<Button variant="contained" color="primary" onClick={modifyMovie}>수정하기</Button>
					<Button variant="contained" color="secondary" onClick={removeMovie}>삭제하기</Button>
				</div>
			}
			{
				movie &&
				<div className="info-con">
					<div className="img-con"><img src="https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17387_103_1.jpg" alt="포스터" /></div>
					<div className="movie-info-con">
						<div className="left-info-con">
							<div className="movie-title">
								<div className="movie-name">{movie.movi_name}</div>
								<div className="movie-age">{movie.avai_age}</div>
							</div>
							<div>
								<div className="menu">
									<div className="menu-subtitle">런타임</div>
									<div>{`${movie.run_time}분`}</div>
								</div>
								<div className="menu">
									<div className="menu-subtitle">배급사</div>
									<div>{movie.company}</div>
								</div>
							</div>
							<div>
								<div className="menu">
									<div className="menu-subtitle">평점</div>
									<div>{movie.rating}</div>
								</div>
								<div className="menu">
									<div className="menu-subtitle">개봉일</div>
									<div>{movie.open_date}</div>
								</div>
							</div>
							<div className="menu">
								<div className="menu-subtitle">누적관객수</div>
								<div>{movie.accu_audience}</div>
							</div>
							{
								Object.keys(genreCodeObj).length !== 0 &&
								<div className="menu-genre menu">
									<div className="menu-subtitle">장르</div>
									<div>{movie.genre.map((code) => <span key={code}>{genreCodeObj[Number(code)]}</span>)}</div>
								</div>
							}
							{
								director &&
								<div className="menu-director menu">
									<div className="menu-subtitle">감독</div>
									<div>{director.map((peop: PeopleType) => <span key={peop.peop_id} onClick={() => handlePeopleClick(peop.peop_id)}>{peop.peop_name}</span>)}</div>
								</div>
							}
							{
								actor &&
								<div className="menu-actor menu">
									<div className="menu-subtitle">배우</div>
									<div>{actor.map((peop: PeopleType) => <span key={peop.peop_id} onClick={() => handlePeopleClick(peop.peop_id)}>{peop.peop_name}</span>)}</div>
								</div>
							}
						</div>
						<div className="right-info-con">
							<div className="menu">
								<div className="menu-subtitle">영화 설명</div>
								<div>{movie.movi_contents}</div>
							</div>
							{
								admin === undefined &&
								<div>
									<Button variant="contained" color="secondary" onClick={()=>{history.push("/book")}}>예매하기</Button>
								</div>
							}
						</div>
					</div>
				</div>
			}
			{
				selectedPeople &&
				<ModalComponent
					open={modalOpen}
					setOpen={setModalOpen}
					title={`${selectedPeople.peop_name}`}
				>
					<div className="people-modal-con">
						<div className="left-right-con">
							<div className="left-con">
								<div className="menu">
									<div className="menu-subtitle">국가</div>
									<div>{selectedPeople.nation}</div>
								</div>
								<div className="menu">
									<div className="menu-subtitle">생년월일</div>
									<div>{`${selectedPeople.birth.substr(0,4)}/${selectedPeople.birth.substr(4,2)}/${selectedPeople.birth.substr(6,2)}`}</div>
								</div>
							</div>
							<div>
								<img src="#" alt="인물 이미지"/>
							</div>
						</div>
						<div className="menu">
							<div className="menu-subtitle">인물소개</div>
							<div>{selectedPeople.peop_contents}</div>
						</div>
					</div>
				</ModalComponent>
			}
		</div>
	)
}

export default MovieExact;