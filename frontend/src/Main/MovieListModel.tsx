import React, { useState, useContext, createContext, Dispatch, useEffect } from 'react';
import { MovieListType, childrenObj } from './Type';

const movieListState = createContext<MovieListType | undefined>(undefined);
const movieListDispatch = createContext<Dispatch<MovieListType | undefined>>(() => { });
const initialMovieData = {
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
			avi_age: 18,
			open_date: new Date("2021/06/03"),
			image: "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17322_103_1.jpg"
		}, {
			movi_id: 3,
			movi_name: "파이프라인",
			rating: 4.6,
			avi_age: 12,
			open_date: new Date("2021/05/23"),
			image: "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17374_103_1.jpg"
		}, {
			movi_id: 4,
			movi_name: "크루엘라",
			rating: 3.6,
			avi_age: 15,
			open_date: new Date("2021/06/20"),
			image: "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17387_103_1.jpg"
		}
	],
	page: 1,
	totalpage: 1,
	amount: 2
};

export const MovieListContextProvider = ({ children }: childrenObj) => {
	// 공통적으로 쓰이는 page가 많아서 model로 정의함 => 영화 리스트 데이터
	const [movieList, setMovieList] = useState<MovieListType | undefined>(initialMovieData);

	return (
		<movieListState.Provider value={movieList}>
			<movieListDispatch.Provider value={setMovieList}>
				{children}
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