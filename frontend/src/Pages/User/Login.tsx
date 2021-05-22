import React, { useEffect, useState, createRef } from 'react';
import { Link } from 'react-router-dom';
import { Birth } from '../../Main/Type';
import { SelectModule } from '../../Components';
import { Tabs, Tab, TextField, Checkbox, Button } from '@material-ui/core';
import "../../scss/pages/login.scss";

const Login = () => {
	const [type, setType] = useState<boolean>(false); // true : 회원, false : 비회원

	/* birth 관련 */
	const [birthYear, setBirthYear] = useState<string>("");
	const [birthMonth, setBirthMonth] = useState<string>("");
	const [birthDate, setBirthDate] = useState<string>("");
	const [birth, setBirth] = useState<string>("");


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
						<Button className="login-btn" variant="contained" color="primary">로그인</Button>
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
				<div className="nonuser-form">
					<div className="form-con">
						<div className="input-con">
							<TextField variant="outlined" placeholder="이름" />
							<TextField variant="outlined" placeholder="핸드폰 번호" />
							<div className="birth-con">
								<SelectModule tag="Year" value={birthYear} handleValueChange={(e) => { setBirthYear(e.target.value) }} start={1930} end={2022}/>
								<SelectModule tag="Month" value={birthMonth} handleValueChange={(e) => { setBirthMonth(e.target.value) }} start={1} end={12}/>
								<SelectModule tag="Date" value={birthDate} handleValueChange={(e) => { setBirthDate(e.target.value) }} start={1} end={30}/>
							</div>
							<TextField variant="outlined" type="password" placeholder="예매 비밀번호" />
							<TextField variant="outlined" type="password" placeholder="예매 비밀번호 확인" />
						</div>
						<Button className="login-btn" variant="contained" color="primary">로그인</Button>
					</div>
					<div className="img-con">
						<img src="/img/ad.png" alt="홍보 이미지" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;