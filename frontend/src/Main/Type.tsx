export type childrenObj = {
	children: React.ReactNode;
}

/* Code */
export type Code = {
	[parent : number] : string[];
}

export type CodeMatch = {
	[code : number] : string;
}

export type CodeType = {
	code_id : string,
	parent_code : string | null,
	code_name : string
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
	image: string,
	accu_audience: number,
	bookrecord: number
}

export type SimpleMovieType = {
	movi_id : number,
	movi_name : string,
	accu_audience : number,
	image : string,
	open_date? : string,
	rating?: number,
	avai_age? : string
}

export type MovieListObjType = {
	[movi_id : number] : SimpleMovieType
}

export type PeopleType = {
  peop_id : number,
  peop_name : string  
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
	movi_name : string;
	hall_id: number;
	hall_name: string; // "42-1관",
	show_date: string; //  "2021/05/25",
	show_time: string; //  "01/41",
	end_time: string; // "2021/12/30/06/03",
	hall_seat: number;
	rema_seat: number;
}

export type ShowScheduleListType = {
    showschedule_list: ShowScheduleType[],
    page: number;
    totalpage: number;
    amount: number;
}

/* hall */
export type HallListType = {
    data: HallType[];
}

export type HallType = {
	hall_id: number; //42,
	hall_name: string; // "42-1관",
	hall_row: number; //2,
	hall_col: number; //2,
	avai_seat_amount: number; //3 => 가능 좌석 수
}

export type SimpleHallType = {
	hall_name: string; // "42-1관",
	hall_row: number; //2,
	hall_col: number; //2
}

export type HallListObjType = {
    [hall_id : number] : SimpleHallType
}
export type SeatType = {
	hall_id: number; //42,
	seat_num: number; //0,
	seat_type_code: string; //"230001"
}

export type HallSeatObjType = {
    seats: SeatType[]
}