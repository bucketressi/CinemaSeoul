import React, { useState } from 'react';
import "../scss/component/_header.scss";
import { Button, MenuItem, TextField, Select } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useUserState, useLogout } from '../Main/UserModel';
import {useMovieListDispatch} from '../Main/MovieListModel';

const changedMovieData = {
	movie_list: [
		{
			movi_id: 1,
			movi_name: "귀멸의 칼날",
			accu_audience: 408,
			avi_age: 15,
			open_date: new Date("2021/05/30"),
			image: "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202101/16908_103_1.jpg"
		}, {
			movi_id: 2,
			movi_name: "보이저스",
			accu_audience: 202,
			avi_age: 18,
			open_date: new Date("2021/06/03"),
			image: "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17322_103_1.jpg"
		}
	],
	page: 1,
	totalpage: 1,
	amount: 2
};

// user 페이지의 header
const Header = () => {
	const setMovieList = useMovieListDispatch();
	const history = useHistory();

	/* 회원 정보 */
	const user = useUserState();
	const logout = useLogout();

	const [searchKeyword, setSearchKeyword] = useState<string>("");
	const [searchType, setSearchType] = useState<number>(0);

	
	const handleKeywordChange = (e : any) => {
		setSearchKeyword(e.target.value);
	}

	const handleSearchTypeChange = (e: any) => {
		setSearchType(e.target.value);
	}

	const search = () => {
		// 검색 시 type을 null, "감독", "배우"로 mapping
		// movielist로 이동하면서 props로 api로부터 받은 moviedata 전달
		setMovieList(changedMovieData);
		history.push("/movie");
	}

	return (
		<header>
			<div className="logo">
				<Link to="/main"><img src="/img/logo.png" alt="logo" /></Link>
			</div>
			<div className="title">
				<p><Link to="/main">Seoul Cinema</Link></p>
				<div className="menu">
					<ul>
						<li><Link to="/movie">영화</Link></li>
						<li><Link to="/book">예매</Link></li>
						<li>커뮤니티</li>
						<li><Link to="/store">스토어</Link></li>
					</ul>
				</div>
			</div>
			<div>
				<div className="sub-menu">
					{
						user ?
							<ul>
								<li><Link to="/myPage"><Button color="primary" variant="outlined">마이페이지</Button></Link></li>
								<li className="logout" onClick={logout}><Button color="primary" variant="outlined">로그아웃</Button></li>
							</ul>
							:
							<ul>
								<li><Link to="/login"><Button color="primary" variant="outlined">로그인</Button></Link></li>
								<li><Link to="/signup"><Button color="primary" variant="outlined">회원가입</Button></Link></li>
							</ul>
					}
				</div>
				<div className="search-con">
					<Select
						className="search-type"
						value={searchType}
						onChange={handleSearchTypeChange}
					>
						<MenuItem value={0}>제목</MenuItem>
						<MenuItem value={1}>감독</MenuItem>
						<MenuItem value={2}>배우</MenuItem>
					</Select>
					<TextField
						className="search-input"
						value={searchKeyword}
						onChange = {handleKeywordChange}
					/>
					<Button color="primary" variant="contained" onClick={search}>검색</Button>
				</div>
			</div>
		</header>
	);
}

export default Header;