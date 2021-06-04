export type childrenObj = {
	children: React.ReactNode;
}

/* Code */
export type Code = {
	[parent: number]: string[];
}

export type CodeMatch = {
	[code: number]: string;
}

export type CodeType = {
	code_id: string,
	parent_code: string | null,
	code_name: string
}

/* Movie */

export type CastMovieType = {
	movi_id: number,
	movi_name: string
}

export type SimpleMovieListType = {
	movie_list: SimpleMovieType[],
	page: number,
	totalpage: number
}

export type MovieType = {
	movi_id: number,
	movi_name: string,
	avai_age: string,
	run_time: number,
	company: string,
	movi_contents: string,
	open_date: string,
	genre: string[],
	casting: MovieCastingType[],
	image: string,
	accu_audience: number,
	rating: number
}

export type SimpleMovieType = {
	movi_id: number,
	movi_name: string,
	accu_audience: number,
	image: string,
	open_date?: string,
	rating?: number,
	avai_age?: string
}

export type MovieListObjType = {
	[movi_id: number]: SimpleMovieType
}

/* people */

export type PeopleType = {
	peop_id: number,
	peop_name: string
}

export type CastingType = {
	cast_type_code: string, //"210001", 
	peop_id: number
}

export type MovieCastingType = {
	cast_type_code: string, //"210001", 
	peop_id: number,//1,
	peop_name: string
}

export type PeopleExactType = {
    peop_id: number,//2,
    peop_name: string,//"강동원",
    nation: string,//"한국",
    birth: string,//"19810118",
    peop_contents: string,//"대한민국의 배우. 수려한 외모, 186cm의 키, 그리고 112cm의 긴 다리를 소유하고 있다.",
    image: string,//"",
    movies: CastMovieType[]
}

/* User */

export type UserType = {
	user_name: string,
	birth?: string, // 비회원은 없음
	phone_num: string,
	email?: string, // 비회원은 없음
	password: string,
	agreement: string,
	curr_point?: number, // 비회원은 없음
	accu_point?: number, // 비회원은 없음
	remain_point?: number, // 비회원은 없음
}

export type AdminType = {
	admi_name: string,
	birth: string,
	phone_num: string,
	password: string,
	admi_auth_code: string,
	position: string,
	address: string,
	start_date: string
}

/* show schedule */
export type ShowScheduleType = {
	show_id: number;
	movi_id: number;
	movi_name: string;
	hall_id: number;
	hall_name: string; // "42-1관",
	show_date: string; //  "2021/05/25",
	show_time: string; //  "01/41",
	end_time: string; // "2021/12/30/06/03",
	hall_seat: number;
	rema_seat: number;
}

export type ShowScheduleListType = ShowScheduleType[];
export type ShowScheduleListObjType = {
	[show_id : number] : ShowScheduleType
};

/* hall */
export type HallType = {
	hall_id: number; //42,
	hall_name: string; // "42-1관",
	hall_row: number; //2,
	hall_col: number; //2,
	avai_seat_amount: number; //3 => 가능 좌석 수
}

export type HallListType = {
	[hall_id: number]: HallType
}

export type SeatAPIType = {
	seats: SeatType[]
}

export type SeatObjType = {
	[seat_num: number]: SeatType
}

export type SeatType = {
	hall_id: number; //42,
	seat_num: number; //0,
	seat_type_code: string; //"230001"
}