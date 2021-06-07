import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';
import { MypageMovieType } from '../../Main/Type';
import { useUserState } from '../../Main/UserModel';
import { Button, Paper, TextField } from '@material-ui/core';
import { ModalComponent } from '../../Components';
import { Rating } from '@material-ui/lab';

type Props = {
	mode: number
}

const MypageMovie = ({ mode }: Props) => {
	const userId = useUserState();
	const AUTH_TOKEN = useTokenState();

	const [movieList, setMovieList] = useState<MypageMovieType[] | undefined>(undefined);
	/* 관람평 모달 */
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [movie, setMovie] = useState<MypageMovieType | undefined>(undefined);
	const [type, setType] = useState<number>(0); // 0 : 생성, 1: 수정

	useEffect(() => {
		if (mode !== 2)
			return;
		fetchUserMovieList();
	}, [mode]);

	const fetchUserMovieList = () => {
		axios.get(`${SERVER_URL}/mymovie/${userId}`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data)
					return;
				setMovieList(res.data);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	/* 관람평 작성 */
	const handleMakeReview = (movie: MypageMovieType, type: number) => {// type이 0이면 생성, type이 1이면 수정
		if (!movie)
			return;
		setOpenModal(true);
		setMovie(movie);
		setType(type);
	}

	const saveReview = () => {
		if (!movie)
			return;

		if (type === 0) {
			// 생성
			console.log(userId, movie.movi_id, movie.rating, movie.comments);
			axios.post(`${SERVER_URL}/review`, {
				"user_id": userId,
				"movi_id": movie.movi_id,
				"rating": movie.rating !== null ? movie.rating : 0,
				"comments": movie.comments !== null ? movie.comments : ""
			}, {
				headers: {
					TOKEN: AUTH_TOKEN
				}
			})
				.then((res) => {
					fetchUserMovieList();
					setOpenModal(false);
				})
				.catch((e) => {
					errorHandler(e, true);
				});
		} else {
			// 수정
			axios.put(`${SERVER_URL}/review`, {
				"user_id": userId,
				"movi_id": movie.movi_id,
				"rating": movie.rating !== null ? movie.rating : 0,
				"comments": movie.comments !== null ? movie.comments : ""
			}, {
				headers: {
					TOKEN: AUTH_TOKEN
				}
			})
				.then((res) => {
					fetchUserMovieList();
					setOpenModal(false);
				})
				.catch((e) => {
					errorHandler(e, true);
				});
		}
	}

	const deleteReview = (movi_id: number) => {
		axios.delete(`${SERVER_URL}/review/delete/${userId}/${movi_id}`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("관람평이 성공적으로 삭제되었습니다.");
				fetchUserMovieList();
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const MovieCard = (movie: MypageMovieType) => (
		movie &&
		<Paper key={movie.movi_id} elevation={4} className="mypage-movie-card">
			<div className="img-con"><img src="https://i.pinimg.com/564x/38/cb/31/38cb31cee4b2da2676f1003a2fcf514d.jpg" alt="포스터" /></div>
			<div className="info-con">
				<div className="name">{movie.movi_name}</div>
				{
					(movie.rating !== null && movie.comments !== null) ?
						<div>
							<div>
								<div>평점</div>
								<Rating
									value={movie.rating}
									readOnly={true}
								/>
							</div>
							<div>관람평 : {movie.comments}</div>
							<div className="btn-con">
								<Button variant="contained" color="primary" onClick={() => handleMakeReview(movie, 1)}>수정하기</Button>
								<Button variant="contained" color="primary" onClick={() => deleteReview(movie.movi_id)}>삭제하기</Button>
							</div>
						</div>
						: <div>
							<Button variant="contained" color="primary" onClick={() => handleMakeReview(movie, 0)}>작성하기</Button>
						</div>
				}
			</div>
		</Paper>
	);

	return (
		<div className="mypage-movie-con">
			{
				movieList &&
				movieList.map((movie) => MovieCard(movie))
			}
			{
				movie &&
				<ModalComponent
					open={openModal}
					setOpen={setOpenModal}
					title="관람평 작성"
					button="저장"
					buttonOnClick={saveReview}
				>
					<div>
						<div>평점</div>
						<Rating
							name="star"
							value={movie.rating}
							onChange={(event: any, newValue: number | null) => {
								const obj: MypageMovieType = Object.assign({}, movie);
								obj.rating = newValue;
								setMovie(obj);
							}}
						/>
					</div>
					<TextField value={movie.comments} onChange={(e: any) => {
						const obj: MypageMovieType = Object.assign({}, movie);
						obj.comments = e.target.value;
						setMovie(obj);
					}} label="관람평" multiline={true} />
				</ModalComponent>
			}
		</div>
	);
}

export default MypageMovie;