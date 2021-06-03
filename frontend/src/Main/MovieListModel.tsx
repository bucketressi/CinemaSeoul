import React, { useState, useContext, createContext, Dispatch, useEffect } from 'react';
import { SimpleMovieType, childrenObj, MovieListObjType } from './Type';
import axios from 'axios';
import { SERVER_URL } from '../CommonVariable';
import { errorHandler } from './ErrorHandler';
import { useTokenState } from './TokenModel';

const movieListState = createContext<SimpleMovieType[] | undefined>(undefined);
const movieListDispatch = createContext<Dispatch<SimpleMovieType[] | undefined>>(() => { });
const movieListObjState = createContext<MovieListObjType | undefined>(undefined);
const fetchMovieFunction = createContext<()=>void>(() => {});

export const MovieListContextProvider = ({ children }: childrenObj) => {
	// 공통적으로 쓰이는 page가 많아서 model로 정의함 => 영화 리스트 데이터
	const AUTH_TOKEN = useTokenState();
	const [movieList, setMovieList] = useState<SimpleMovieType[] | undefined>(undefined);
	const [movieListObj, setMovieListObj] = useState<MovieListObjType | undefined>(undefined);

	useEffect(() => {
		// id로 접근하기 좋게 obj 형태로 만들기
		const obj = Object.assign({}, movieListObj);
		movieList?.forEach((movie) => {
			obj[movie.movi_id] = movie;
		});
		setMovieListObj(obj);
	}, [movieList]);

	const fetchMovie = () => {
		axios.post(`${SERVER_URL}/movie/list`, {
			//전체 : 0, 상영중  1, 상영예정 : 2
			"page": 1,
			"stat": 0,
			"sort": 0
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
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
	}

	return (
		<movieListState.Provider value={movieList}>
			<movieListDispatch.Provider value={setMovieList}>
				<fetchMovieFunction.Provider value={fetchMovie}>
					<movieListObjState.Provider value={movieListObj}>
						{children}
					</movieListObjState.Provider>
				</fetchMovieFunction.Provider>
			</movieListDispatch.Provider>
		</movieListState.Provider>
	);
}

export function useMovieListState() {
	const context = useContext(movieListState);
	return context;
}
export function useMovieListObjState() {
	const context = useContext(movieListObjState);
	return context;
}
export function useMovieListDispatch() {
	const context = useContext(movieListDispatch);
	return context;
}
export function useFetchMovieFunction() {
	const context = useContext(fetchMovieFunction);
	return context;
}