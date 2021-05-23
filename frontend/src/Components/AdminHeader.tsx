import React from 'react';
import "../scss/component/_header.scss";
import { Link } from 'react-router-dom';

const AdminHeader = () => {
	return (
		<header className="admin-header">
			<div className="title">
				<p>Seoul Cinema</p>
				<p className="sm-title">관리자용 사이트</p>
			</div>
			<div className="menu">
				<ul>
					<li><Link to="/admin/movie">영화</Link></li>
					<li><Link to="/admin/movie">영화</Link></li>
					<li><Link to="/admin/movie">영화</Link></li>
					<li><Link to="/admin/movie">영화</Link></li>
					<li><Link to="/admin/movie">영화</Link></li>
				</ul>
			</div>
		</header>
	)
}

export default AdminHeader