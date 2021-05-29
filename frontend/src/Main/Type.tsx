export type childrenObj = {
	children: React.ReactNode;
}

/* Movie */

export type MovieListType = {
	movie_list: SimpleMovieType[],
	page: number,
	totalpage: number
}

export type MovieType = {
	movi_id: number,
	movi_name: string,
	avi_age: string,
	show_time: number,
	company: string,
	movi_contents: string,
	open_date: string,
	genre: number[],
	cast_director: PeopleType,
	cast_actor: PeopleType,
	image: Blob,
	accu_audience: number,
	bookrecord: number
}

export type PeopleType = {
  peop_id : number,
  peop_name : string  
}

export type SimpleMovieType = {
	movi_id? : number;
	movi_name : string;
	accu_audience : number;
	image : string;
	open_date : Date;
	avi_age : number;
}

/* User */

export type UserType = {
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

export type AdminType = {
	admi_name : string,
	birth : string,
	phone_num : string,
	password : string,
	admi_auth_code : string,
	position : string,
	address : string,
	start_date : string
}

/* show schedule */
export type ShowScheduleType = {
	show_id: number;
	movi_id: number;
	hall_id: number;
	hall_name: string; // "42-1관",
	show_date: string; //  "20210525",
	show_time: string; //  "0141",
	end_time: string; // "20211230603",
	hall_seat: number;
	rema_seat: number;
}
export type ShowScheduleListType = {
    showschedule_list: ShowScheduleType[],
    page: number;
    totalpage: number;
    amount: number;
}