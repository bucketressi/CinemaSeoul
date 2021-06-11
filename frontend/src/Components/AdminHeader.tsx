import React, { useEffect, useState } from 'react';
import "../scss/component/_header.scss";
import { Button, MenuItem, TextField, Select } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useAdminState, useLogout } from '../Main/UserModel';
import { useMovieListDispatch } from '../Main/MovieListModel';
import { usePeopleTypeCodeState } from '../Main/CodeModel';

import axios from 'axios';
import { SERVER_URL } from '../CommonVariable';
import { errorHandler } from '../Main/ErrorHandler';
import { useTokenState } from '../Main/TokenModel';

const AdminHeader = () => {
	const AUTH_TOKEN = useTokenState();
	const setMovieList = useMovieListDispatch();
	const history = useHistory();
	const peopleType = usePeopleTypeCodeState();

	/* 직원 정보 */
	const admin = useAdminState();
	const logout = useLogout();

	const [searchKeyword, setSearchKeyword] = useState<string>("");
	const [searchType, setSearchType] = useState<number>(0); // 0: 제목, 1: 감독, 2: 배우

	const handleKeywordChange = (e: any) => {
		setSearchKeyword(e.target.value);
	}

	const handleSearchTypeChange = (e: any) => {
		setSearchType(e.target.value);
	}

	const search = () => {
		history.push(`/admin/movie/search/${searchKeyword===""?null:searchKeyword}/${searchType}`);
	}

	useEffect(()=> { // 페이지 바뀔 때마다 초기화
		setSearchKeyword("");
		setSearchType(0);
	}, [location.pathname]);

	return (
		<header className="admin-header">
			<Link to="/admin">
				<div className="title">
					<p>Seoul Cinema</p>
					<p className="sm-title">관리자용 사이트</p>
				</div>
			</Link>
			<div className="right-header">
				<div className="menu-con">
					<div className="menu">
						<ul>
							<li><Link to="/admin/movie">영화</Link></li>
							<li><Link to="/admin/hall">상영관</Link></li>
							<li><Link to="/admin/showschedule">상영일정</Link></li>
							<li><Link to="/admin/product">상품</Link></li>
							<li><Link to="/admin/people">인물</Link></li>
							<li><Link to="/admin/ask">1:1 문의</Link></li>
							<li><Link to="/admin/blacklist">블랙리스트</Link></li>
							<li><Link to="/admin/list">내역관리</Link></li>
							<li><Link to="/admin/sales">매출관리</Link></li>
							<li><Link to="/admin/audience">관람현황</Link></li>
							<li><Link to="/admin/employee">직원관리</Link></li>
							<li><Link to="/admin/notice">공지사항</Link></li>
							<li><Link to="/admin/faq">FAQ</Link></li>
							<li><Link to="/admin/event">이벤트</Link></li>
						</ul>
					</div>
					<div className="sub-menu">
						{
							admin !== undefined ?
								<ul>
									<li><Link to="/admin/myPage"><Button color="primary" variant="outlined">마이페이지</Button></Link></li>
									<li className="logout" onClick={logout}><Button color="primary" variant="outlined">로그아웃</Button></li>
								</ul>
								:
								<ul>
									<li><Link to="/admin/login"><Button color="primary" variant="outlined">로그인</Button></Link></li>
								</ul>
						}
					</div>
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
						onChange={handleKeywordChange}
					/>
					<Button color="primary" variant="contained" onClick={search}>검색</Button>
				</div>
			</div>
		</header>
	)
}

export default AdminHeader