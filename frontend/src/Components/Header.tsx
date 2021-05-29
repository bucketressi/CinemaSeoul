import React from 'react';
import "../scss/component/_header.scss";
import { Link, useLocation } from 'react-router-dom';
import { useUserState, useLogout } from '../Main/UserModel';

// user 페이지의 header
const Header = () => {

	/* 회원 정보 */
	const user = useUserState();
	const logout = useLogout();

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
			<div className="sub-menu">
				{
					user ?
						<ul>
							<li><Link to="/myPage">마이페이지</Link></li>
							<li className="logout" onClick={logout}>로그아웃</li>
						</ul>
						:
						<ul>
							<li><Link to="/login">로그인</Link></li>
							<li><Link to="/signup">회원가입</Link></li>
						</ul>
				}
			</div>
		</header>
	);
}

export default Header;