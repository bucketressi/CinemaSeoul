import React, { useEffect, useState, createRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SelectModule } from '../../Components';
import { Tabs, Tab, TextField, Checkbox, Button } from '@material-ui/core';
import { useUserLogin, useNonUserLogin } from '../../Main/UserModel';
import "../../scss/pages/login.scss";

const Login = () => {
	const [type, setType] = useState<boolean>(false); // true : 회원, false : 비회원
	
	/* 회원가입 정보 */
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordDual, setPasswordDual] = useState<string>("");
	const [phoneNum, setPhoneNum] = useState<string>("");
	const [agreement, setAgreement] = useState<boolean>(true);
	const [birthYear, setBirthYear] = useState<string>("");
	const [birthMonth, setBirthMonth] = useState<string>("");
	const [birthDate, setBirthDate] = useState<string>("");
	const [birth, setBirth] = useState<string>("");

	useEffect(() => {
		setBirth(`${birthYear}/${birthMonth}/${birthDate}`);
	}, [birthYear, birthMonth, birthDate]);

	const handleTypeChange = (event: any, newValue: boolean) => { setType(newValue); };
	const openFindIdModal = () => { console.log("id"); };
	const openFindPWModal = () => { console.log("pw"); };
	const history = useHistory();

	/* 로그인 */
	const userLogin = useUserLogin();
	const nonUserLogin = useNonUserLogin();

	const handleUserLogin = () => {
		userLogin(email, password);
		history.push("/main");
	}

	const handleNonUserLogin = () => {
		nonUserLogin({
			user_name : name,
			birth,
			phone_num : phoneNum,
			email,
			password,
			agreement
		});
		history.push("/main");
	}

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
							<TextField variant="outlined" placeholder="이메일을 입력해주세요." onChange={(e) => {setEmail(e.target.value);}}/>
							<TextField variant="outlined" type="password" placeholder="비밀번호를 입력해주세요."  onChange={(e) => {setPassword(e.target.value);}}/>
						</div>
						<Button className="btn" variant="contained" color="primary" onClick={handleUserLogin}>로그인</Button>
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
							<TextField variant="outlined" placeholder="이름" onChange={(e) => {setName(e.target.value);}}/>
							<TextField variant="outlined" placeholder="핸드폰 번호" onChange={(e) => {setPhoneNum(e.target.value);}}/>
							<div className="birth-con">
								<SelectModule tag="Year" value={birthYear} handleValueChange={(e) => { setBirthYear(e.target.value) }} start={1930} end={2022}/>
								<SelectModule tag="Month" value={birthMonth} handleValueChange={(e) => { setBirthMonth(e.target.value) }} start={1} end={12}/>
								<SelectModule tag="Date" value={birthDate} handleValueChange={(e) => { setBirthDate(e.target.value) }} start={1} end={30}/>
							</div>
							<TextField variant="outlined" type="password" placeholder="예매 비밀번호" onChange={(e) => {setPassword(e.target.value);}}/>
							<TextField variant="outlined" type="password" placeholder="예매 비밀번호 확인" onChange={(e) => {setPasswordDual(e.target.value);}}/>
						</div>
						<div className="btn-con">
							<Link to="/SignUp"><Button className="btn" variant="outlined" color="primary">회원가입</Button></Link>
							<Button className="btn" variant="contained" color="primary" onClick={handleNonUserLogin}>로그인</Button>
						</div>
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