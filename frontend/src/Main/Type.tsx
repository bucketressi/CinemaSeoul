export type childrenObj = {
	children: React.ReactNode;
}

/* Movie */

export type MovieList = {
	movie_list : MovieZip[],
	page: number,
	totalpage : number
}

export type MovieZip = {
	movi_id : number,
	movi_name : String,
	score : number,
	image : Blob
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