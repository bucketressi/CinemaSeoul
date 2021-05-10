import React from 'react';
import "../scss/component/_header.scss";
import { Link } from 'react-router-dom';

// user 페이지의 header
const Header = () => {
	return (
		<header>
			<div className="logo">
				<img src="/img/logo.png" alt="logo"/>
			</div>
			<div className="title">
				<p>Seoul Cinema</p>
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
				<ul>
					<li><Link to="/login">로그인</Link></li>
					<li><Link to="/signup">회원가입</Link></li>
				</ul>
			</div>
		</header>
	);
}

export default Header;