import React from 'react';
import "../scss/component/_header.scss";
import { Link } from 'react-router-dom';
import { useAdminState, useLogout } from '../Main/AdminModel';

const AdminHeader = () => {

	/* 직원 정보 */
	const admin = useAdminState();
	const logout = useLogout();

	return (
		<header className="admin-header">
			<Link to="/admin">
				<div className="title">
					<p>Seoul Cinema</p>
					<p className="sm-title">관리자용 사이트</p>
				</div>
			</Link>
			<div className="menu">
				<ul>
					<li><Link to="/admin/movie">영화</Link></li>
					<li><Link to="/admin/movie">영화</Link></li>
					<li><Link to="/admin/movie">영화</Link></li>
					<li><Link to="/admin/movie">영화</Link></li>
					<li><Link to="/admin/movie">영화</Link></li>
				</ul>
			</div>
			<div className="sub-menu">
				{
					admin ?
						<ul>
							<li><Link to="/admin/myPage">마이페이지</Link></li>
							<li className="logout" onClick={logout}>로그아웃</li>
						</ul>
						:
						<ul>
							<li><Link to="/admin/login">로그인</Link></li>
						</ul>
				}
			</div>
		</header>
	)
}

export default AdminHeader