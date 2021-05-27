export type childrenObj = {
	children: React.ReactNode;
}

/* Movie */

export type MovieList = {
	movie_list: MovieZip[],
	page: number,
	totalpage: number
}

export type MovieZip = {
	movi_id: number,
	movi_name: string,
	score: number,
	image: Blob
}

export type Movie = {
	movi_id: number,
	movi_name: string,
	avi_age: string,
	show_time: number,
	company: string,
	movi_contents: string,
	open_date: string,
	genre: number[],
	cast_director: People,
	cast_actor: People,
	image: Blob,
	rating: number,
	bookrecord: number
}

export type People = {
  peop_id : number,
  peop_name : string  
}

export type SimpleMovieType = {
	movi_id? : number;
	movi_name : string;
	rating : number;
	image : string;
	open_date : Date;
	avi_age : number;
}

export type User = {
	user_name : string,
	birth? : string, // 비회원은 없음
	phone_num : string,
	email? : string, // 비회원은 없음
	password : string,
	agreement : string,
	curr_point? : number, // 비회원은 없음
	accu_point? : number, // 비회원은 없음
	remain_point? : number, // 비회원은 없음
}

export type Admin = {
	admi_name : string,
	birth : string,
	phone_num : string,
	password : string,
	admi_auth_code : string,
	position : string,
	address : string,
	start_date : string
}
