import React, { useState } from 'react';
import "../scss/component/_header.scss";
import { Button, MenuItem, TextField, Select } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useAdminState, useLogout } from '../Main/UserModel';
import { useMovieListDispatch } from '../Main/MovieListModel';

const AdminHeader = () => {
	const setMovieList = useMovieListDispatch();
	const history = useHistory();

	/* 직원 정보 */
	const admin = useAdminState();
	const logout = useLogout();

	const [searchKeyword, setSearchKeyword] = useState<string>("");
	const [searchType, setSearchType] = useState<number>(0);

	const handleKeywordChange = (e: any) => {
		setSearchKeyword(e.target.value);
	}

	const handleSearchTypeChange = (e: any) => {
		setSearchType(e.target.value);
	}

	const search = () => {
		// 검색 시 type을 null, "감독", "배우"로 mapping
		// movielist로 이동하면서 props로 api로부터 받은 moviedata 전달
		history.push("/admin/movie");
	}

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
							<li><Link to="/admin/movie">영화</Link></li>
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