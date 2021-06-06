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

export type AbleMovieType = {
	movi_id: number,
	movi_name: string,
	avai_age: string
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
	email: string,
	password: string,
	admi_auth: string,
	position: string,
	address: string,
	start_date: string
}

/* show schedule */
export type ShowScheduleType = {
	show_id: number,
	movi_id: number,
	movi_name: string,
	hall_id: number,
	hall_name: string, // "42-1관",
	show_date: string, //  "2021/05/25",
	show_time: string, //  "01/41",
	end_time: string, // "2021/12/30/06/03",
	hall_seat: number,
	rema_amount: number,
	started?: string
}

export type ShowScheduleListType = ShowScheduleType[];
export type ShowScheduleListObjType = {
	[show_id: number]: ShowScheduleType
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

export type BookSeatType = {
	hall_id: number; //42,
	seat_num: number; //0,
	seat_type: string; //"230001"
	booked: boolean
}

/* Book */

export type BookShowScheduleType = {
	show_id: number,
	movi_name: string,
	hall_name: string,
	show_date: string, //  "2021/05/25",
	show_time: string, //  "01/41",
	rema_amount: number,
	hall_seat: number
}

export type BookSeatListType = BookSeat[];
export type BookSeat = {
	hall_id: number,//66,
	seat_num: number,//0,
	seat_type: string,//"230001",
	booked: boolean, //false
};

/* Product */
export type ProductAPIType = {
	products: ProductType[],
	page: number, //1,
	totalpage: number,//1,
	amount: number//15
}

export type ProductType = {
	prod_id: number,//6,
	prod_name: string, //팝콘(소),
	price: number, //7000,
	limit: number, //0,
	image: string,
}

export type ProductExactType = {
	prod_id: number,//6,
	prod_name: string,//"팝콘(소)",
	price: number,//7000,
	prod_type_code: string,//"310001",
	limit: number,//9997,
	prod_contents: string,//"카라멜맛 양파맛 선택 가능한 팝콘 (소)",
	image: string//""
}

export type CartProductType = {
	[prod_id: number]: {
		"product": ProductExactType,
		"number": number
	}
}

export type ProductRequestType = {
	prod_id: number,//6,
	amount: number,//2,
	price: number//7000
}

/* Mypage */
export type MypageUserType = {
	user_id: number,//149,
	user_name: string, //우희은,
	birth: string, //20221230,
	phone_num: string, //01045117731,
	email: string, //희은2@,
	agreement: string, //1,
	curr_point: number,//3449,
	accu_point: number,//11489,
	user_type: string//Friends
}

export type UserBookType = {
	book_datetime: string, //"2021-06-05 01:09:48"
	book_id: number, //74
	book_pay_id: number, //97
	hall_name: string, //"66관"
	movi_name: string, //"분노의 질주"
	show_date: string, //"20210606"
	show_time: string, //"2143"
	user_name: string //"우희은"
}

export type UserBookExactType = {
	book_id: number,// 74,
	book_pay_id: number,// 97,
	user_name: string, //우희은,
	teen: number, //1,
	adult: number, //0,
	senior: number, //0,
	impaired: number, //0,
	book_datetime: string, //2021-06-05 01:09:48,
	show_date: string, //20210606,
	show_time: string, //2143,
	movi_name: string, //분노의 질주,
	run_time: number, //145,
	hall_name: string, //66관,
	seat_num: number[],
	use_code: string,//a28a9294ab6dd693,
	use_datetime: string,
}

export type UserBookPayType = {
	book_pay_id: number,//70,
	book_id: number,//0,
	user_id: number,//149,
	use_point: number,//0,
	price: number,//10000,
	accu_point: number, //0,
	pay_type: string, //신용카드,
	pay_state_code: string, //결제취소,
	pay_datetime: string, //2021-06-03 19:13:20,
	use_datetime: string, //null,
	use_code: string, //9e230beaa34df8ca
	show_date: string, //20210601,
	show_time: string, //1650,
	movi_name: string,//귀멸의 칼날
}
export type UserProductPayType = {
	prod_pay_id: number, //62,
	user_id: number, //0,
	productPayDetails: MypageProductType[],
	use_point: number, //500,
	price: number, //24000,
	accu_point: number, //0,
	pay_type: string, // 간편결제,
	pay_state_code: string, // 결제완료,
	pay_datetime: string, //2021-06-03 03:35:47,
	use_datetime: string, //null,
	use_code: string, //b567e16a2e4c2a13,
}

export type MypageProductType = {
	prod_id: number, //6,
	prod_name: string, //팝콘(소),
	price: number, //7000,
	amount: number,//2
}

export type MypageMovieType = {
	comments: string | null, //null,
	rating: number | null, //null,
	movi_id: number, //126,
	movi_name: string, //트랜스포머1,
	images: string | null //
}

export type MypagePointType = {
	poin_id : number,
	poin_amount : number,
	poin_type : string,
	message : string,
	poin_datetime : string
}

export type MypageAskType = {
	admi_name: string | null,
	answ_datetime: string| null,
	ask_id: number,
	ask_title: string, //"저도 포인트 주세요"
	crea_datetime: string, // "2021-06-04 16:23:27"
	user_name: string, // "우희은"
}

export type MypageAskExactType = {
    ask_id: number, //2,
    user_id: number, //145,
    user_name: string, //김손님,
    ask_title: string, //제 포인트가 이상해요,
    ask_contents: string ,//빨리 100000포인트 주세요,
    admi_id: number, //121,
    admi_name: string | null, //우희은,                     //없으면 null
    answer: string | null, //안됩니다.,                       //없으면 null
    crea_datetime: string, //2021-06-04 16:22:25,
    answ_datetime: string, //2021-06-04 16:26:07 //없으면 null
}

