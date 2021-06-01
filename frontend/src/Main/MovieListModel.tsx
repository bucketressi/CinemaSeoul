import React, { useState, useContext, createContext, Dispatch, useEffect } from 'react';
import { SimpleMovieType, childrenObj } from './Type';
import axios from 'axios';
import { SERVER_URL } from '../CommonVariable';
import { errorHandler } from './ErrorHandler';
import { useTokenState } from './TokenModel';

const movieListState = createContext<SimpleMovieType[] | undefined>(undefined);
const movieListDispatch = createContext<Dispatch<SimpleMovieType[] | undefined>>(() => { });
const fetchMovieFunction = createContext<()=>void>(() => {});

export const MovieListContextProvider = ({ children }: childrenObj) => {
	// 공통적으로 쓰이는 page가 많아서 model로 정의함 => 영화 리스트 데이터
	const token = useTokenState();
	const [movieList, setMovieList] = useState<SimpleMovieType[] | undefined>(undefined);

	useEffect(() => { // 처음에 영화 리스트 데이터 받아오기
		fetchMovie();
	}, []);

	const fetchMovie = () => {
		axios.post(`${SERVER_URL}/movie/list`, {
			//전체 : 0, 상영중  1, 상영예정 : 2
			"page": 1,
			"stat": 0,
			"sort": 0
		}, {
			headers: {
				"TOKEN": token
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
					{children}
				</fetchMovieFunction.Provider>
			</movieListDispatch.Provider>
		</movieListState.Provider>
	);
}

export function useMovieListState() {
	const context = useContext(movieListState);
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