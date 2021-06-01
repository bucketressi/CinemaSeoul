import React, { useState } from 'react';
import { TextField, Checkbox, Button } from '@material-ui/core';
import { useAdminLogin } from '../../Main/UserModel';

const AdminLogin = () => {
	// 관리자 로그인 페이지
	const adminLogin = useAdminLogin();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const openFindIdModal = () => { console.log("id"); };
	const openFindPWModal = () => { console.log("pw"); };

	const handleAdminLogin = () => {
		adminLogin(email, password);
	}


	return (
		<div className="user-form">
			<div className="form-con">
				<div className="input-con">
					<TextField variant="outlined" placeholder="이메일을 입력해주세요." onChange={(e) => { setEmail(e.target.value); }} />
					<TextField variant="outlined" type="password" placeholder="비밀번호를 입력해주세요." onChange={(e) => { setPassword(e.target.value); }} />
				</div>
				<Button className="btn" variant="contained" color="primary" onClick={handleAdminLogin}>로그인</Button>
				<div className="under-menu">
					<div className="checkbox-con">
						<Checkbox color="primary" />
						<p>아이디저장</p>
					</div>
					<div className="sub-menu">
						<span onClick={openFindIdModal}>아이디 찾기</span>
						<span className="last" onClick={openFindPWModal}>비밀번호 찾기</span>
					</div>
				</div>
			</div>
			<div className="right-con">
				<img src="/img/picture.jpg" alt="홍보 이미지" />
			</div>
		</div>
	);
};

export default AdminLogin;