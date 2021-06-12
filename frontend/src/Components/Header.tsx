import React, { useEffect, useState } from 'react';
import "../scss/component/_header.scss";
import { Button, MenuItem, TextField, Select } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useUserState, useLogout } from '../Main/UserModel';
import {useMovieListDispatch} from '../Main/MovieListModel';
import { usePeopleTypeCodeState } from '../Main/CodeModel';

import axios from 'axios';
import { SERVER_URL } from '../CommonVariable';
import { errorHandler } from '../Main/ErrorHandler';
import { useTokenState } from '../Main/TokenModel';

// user 페이지의 header
const Header = () => {
	const AUTH_TOKEN = useTokenState();
	const setMovieList = useMovieListDispatch();
	const history = useHistory();
	const peopleType = usePeopleTypeCodeState();

	/* 회원 정보 */
	const user = useUserState();
	const logout = useLogout();

	const [searchKeyword, setSearchKeyword] = useState<string>("");
	const [searchType, setSearchType] = useState<number>(0); // 0: 제목, 1: 감독, 2: 배우

	
	const handleKeywordChange = (e : any) => {
		setSearchKeyword(e.target.value);
	}

	const handleSearchTypeChange = (e: any) => {
		setSearchType(e.target.value);
	}

	const search = () => {
		history.push(`/movie/search/${searchKeyword===""?null:searchKeyword}/${searchType}`);
	}
	useEffect(()=> { // 페이지 바뀔 때마다 초기화
		setSearchKeyword("");
		setSearchType(0);
	}, [location.pathname]);

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
						<li><Link to="/notice">공지사항</Link></li>
						<li><Link to="/faq">FAQ</Link></li>
						<li><Link to="/event">이벤트</Link></li>
						<li><Link to="/product">스토어</Link></li>
					</ul>
				</div>
			</div>
			<div>
				<div className="sub-menu">
					{
						user !== undefined ?
							<ul>
								<li><Link to="/myPage"><Button color="primary" variant="outlined">마이페이지</Button></Link></li>
								<li className="logout" onClick={logout}><Button color="primary" variant="outlined">로그아웃</Button></li>
								<li><Link to="/admin"><Button color="primary" variant="outlined">관리자</Button></Link></li>
							</ul>
							:
							<ul>
								<li><Link to="/login"><Button color="primary" variant="outlined">로그인</Button></Link></li>
								<li><Link to="/signup"><Button color="primary" variant="outlined">회원가입</Button></Link></li>
								<li><Link to="/admin"><Button color="primary" variant="outlined">관리자</Button></Link></li>
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