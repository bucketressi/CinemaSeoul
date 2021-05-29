import React, { useEffect, useState, createRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SelectModule } from '../../Components';
import { Tabs, Tab, TextField, Checkbox, Button, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
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
	const [agreement, setAgreement] = useState<string>("1");
	const [birthYear, setBirthYear] = useState<string>("");
	const [birthMonth, setBirthMonth] = useState<string>("");
	const [birthDate, setBirthDate] = useState<string>("");
	const [birth, setBirth] = useState<string>("");
	const [saveId, setSaveId] = useState<boolean>(false);

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
			user_name: name,
			birth,
			phone_num: phoneNum,
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
							<TextField variant="outlined" placeholder="이메일을 입력해주세요." onChange={(e) => { setEmail(e.target.value); }} />
							<TextField variant="outlined" type="password" placeholder="비밀번호를 입력해주세요." onChange={(e) => { setPassword(e.target.value); }} />
						</div>
						<Button className="btn" variant="contained" color="primary" onClick={handleUserLogin}>로그인</Button>
						<div className="under-menu">
							<div className="checkbox-con">
								<Checkbox color="primary" value={saveId} onChange={() => {setSaveId(!saveId)}}/>
								<p>아이디저장</p>
							</div>
							<div className="sub-menu">
								<Link to="/SignUp"><span>회원가입</span></Link>
								<span onClick={openFindIdModal}>아이디 찾기</span>
								<span className="last" onClick={openFindPWModal}>비밀번호 찾기</span>
							</div>
						</div>
					</div>
					<div className="right-con">
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
							<TextField variant="outlined" placeholder="이름" onChange={(e) => { setName(e.target.value); }} />
							<TextField variant="outlined" placeholder="핸드폰 번호" onChange={(e) => { setPhoneNum(e.target.value); }} />
							<div className="birth-con">
								<SelectModule tag="Year" value={birthYear} handleValueChange={(e) => { setBirthYear(e.target.value) }} start={1930} end={2022} />
								<SelectModule tag="Month" value={birthMonth} handleValueChange={(e) => { setBirthMonth(e.target.value) }} start={1} end={12} />
								<SelectModule tag="Date" value={birthDate} handleValueChange={(e) => { setBirthDate(e.target.value) }} start={1} end={30} />
							</div>
							<TextField variant="outlined" type="password" placeholder="예매 비밀번호" onChange={(e) => { setPassword(e.target.value); }} />
							<TextField variant="outlined" type="password" placeholder="예매 비밀번호 확인" onChange={(e) => { setPasswordDual(e.target.value); }} />
						</div>
						<div className="btn-con">
							<Link to="/SignUp"><Button className="btn" variant="outlined" color="primary">회원가입</Button></Link>
							<Button className="btn" variant="contained" color="primary" onClick={handleNonUserLogin}>로그인</Button>
						</div>
					</div>
					<div className="right-con">
						<div className="agreement-con">
							<p>
								개인정보의 수집목적 및 항목<br />
								① 개인정보 수집 목적: 비회원 예매확인 및 이용자 식별<br />
								② 수집항목: 이름, 휴대폰번호, 생년월일, 고유번호<br /><br />

								개인정보의 보유 및 이용기간<br />
								개인정보는 영화 예매 완료 후 동의일로부터 70일까지 위 이용 목적으로 이용 및 보유 합니다. (단, 생년월일은 이용자 식별 목적으로 이용되며 별도 보관되지 않습니다.)<br />
								다만, 상법 등 관련법령의 규정에 의하여 거래 관련 관리 의무 관계의 확인 등을 이유로 일정기간 보유하여야 할 필요가 있을 경우 아래와 같이 보유합니다.<br />
								대금결제 및 재화 등의 공급에 관한 기록 : 5년<br /><br />

								※ 비회원 예매서비스 제공을 위한 최소한의 개인정보이며 거부할 수 있습니다. 다만, 수집에 동의하지 않을 경우 서비스 이용이 제한됩니다.<br />
							</p>
							<RadioGroup value={agreement} className="agree-check-con" onChange={(e)=>{setAgreement(e.target.value)}}>
								<FormControlLabel value="1" control={<Radio color="primary"/>} label="동의" />
								<FormControlLabel value="0" control={<Radio color="primary" />} label="동의하지 않음" />
							</RadioGroup>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;