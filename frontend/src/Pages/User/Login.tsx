import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Birth } from '../../Main/Type';
import { Tabs, Tab, TextField, Checkbox, Button, Select, FormControl, InputLabel } from '@material-ui/core';
import "../../scss/pages/login.scss";

const Login = () => {
	const [type, setType] = useState<boolean>(false); // true : 회원, false : 비회원

	const handleTypeChange = (event: any, newValue: boolean) => { setType(newValue); };
	const openFindIdModal = () => { console.log("id"); };
	const openFindPWModal = () => { console.log("pw"); };
	
	return (
		<div className="login-con">
			<Tabs
				value={type}
				onChange={handleTypeChange}
				indicatorColor="primary"
				textColor="primary"
			>
				<Tab label="회원" />
				<Tab label="비회원" />
			</Tabs>
			<div
				role="tabpanel"
				hidden={type}
			>
				<div className="user-form">
					<div className="form-con">
						<div className="input-con">
							<TextField variant="outlined" placeholder="이메일을 입력해주세요." />
							<TextField variant="outlined" type="password" placeholder="비밀번호를 입력해주세요." />
						</div>
						<Button variant="contained" color="primary">로그인</Button>
						<div className="under-menu">
							<div className="checkbox-con">
								<Checkbox color="primary" />
								<p>아이디저장</p>
							</div>
							<div className="sub-menu">
								<Link to="/SignUp"><span>회원가입</span></Link>
								<span onClick={openFindIdModal}>아이디 찾기</span>
								<span className="last" onClick={openFindPWModal}>비밀번호 찾기</span>
							</div>
						</div>
					</div>
					<div className="img-con">
						<img src="/img/killer.jpg" alt="홍보 이미지" />
					</div>
				</div>
			</div>
			<div
				role="tabpanel"
				hidden={!type}
			>
				<div className="nonuser-form form-con">
					비회원
				</div>
			</div>
		</div>
	);
}

export default Login;