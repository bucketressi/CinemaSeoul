import React, { useState, useEffect } from 'react';
import { PageTitle, SelectModule } from '../../Components';
import { TextField, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import "../../scss/pages/signup.scss";

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';

const SignUp = () => {
	const history = useHistory();
	const AUTH_TOKEN = useTokenState();

	/* 회원가입 정보 */
	const [name, setName] = useState<string>("");
	const [birth, setBirth] = useState<string>("");
	const [phoneNum, setPhoneNum] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordDual, setPasswordDual] = useState<string>("");
	const [agreement, setAgreement] = useState<string>("1");

	/* 생년월일 */
	const [birthYear, setBirthYear] = useState<string>("");
	const [birthMonth, setBirthMonth] = useState<string>("");
	const [birthDate, setBirthDate] = useState<string>("");

	/* 중복 체크 */
	const [isPhoneNumExist, setPhoneNumExist] = useState<number>(-1); // -1 아직 안함, 0 중복된 번호 없음, 1 중복된 번호 있음
	const [isEmailExist, setEmailExist] = useState<number>(-1); // -1 아직 안함, 0 중복된 이메일 없음, 1 중복된 이메일 있음

	useEffect(() => {
		setBirth(`${birthYear}${birthMonth}${birthDate}`);
	}, [birthYear, birthMonth, birthDate]);

	const preTreatment = () => {
		if (name === "") {
			alert("이름을 입력해주세요.");
			return false;
		}
		if (password === "") {
			alert("패스워드를 입력해주세요.");
			return false;
		}
		if (password !== passwordDual) {
			alert("비밀번호와 비밀번호 확인이 같지 않습니다.");
			return false;
		}
		if (!email.includes("@")) {
			alert("이메일 형식을 확인해주세요.");
			return false;
		}
		if (isPhoneNumExist === -1) {
			alert("중복된 핸드폰 번호가 있는지 버튼을 눌러 체크해주세요.");
			return false;
		}
		if (isPhoneNumExist === 1) {
			alert("중복된 핸드폰 번호가 있어 회원가입할 수 없습니다. 다른 핸드폰 번호를 입력해주세요.");
			return false;
		}
		if (isEmailExist === -1) {
			alert("중복된 이메일이 있는지 버튼을 눌러 체크해주세요.");
			return false;
		}
		if (isEmailExist === 1) {
			alert("중복된 이메일이 있어 회원가입할 수 없습니다. 다른 이메일을 입력해주세요.");
			return false;
		}
		return true;
	}

	const signUp = () => {
		if (!preTreatment())
			return;
		// api 고치고 다시 하기
		axios.post(`${SERVER_URL}/user/signup`, {
			"user_name": name,
			"birth": birth,
			"phone_num": phoneNum,
			"email": email,
			"password": password,
			"agreement": agreement
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				history.push("/login");
			})
			.catch((e) => {
				errorHandler(e, true);
			});
		//"{"user_name":"우희은","birth":"1947/6/16","phone_num":"01045117733","email":"희은@","password":"1234","agreement":"1"}"
	}

	const checkPhoneNum = () => {
		if(phoneNum === "" || phoneNum.length !== 11){
			alert("정확한 핸드폰 번호를 입력해주세요.");
			return;
		}
		axios.post(`${SERVER_URL}/user/phonecheck`, {
			"phone_num": phoneNum,
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				setPhoneNumExist(0);
				alert("해당 핸드폰 번호를 사용할 수 있습니다.");
			})
			.catch((e) => {
				setPhoneNumExist(1);
				alert("중복된 핸드폰 번호가 존재합니다.");
			});
	}

	const checkEmail = () => {
		if(email === "" || !email.includes("@")){
			alert("정확한 이메일을 입력해주세요.");
			return;
		}
		axios.post(`${SERVER_URL}/user/emailcheck`, {
			"email": email,
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				setEmailExist(0);
				alert("해당 이메일을 사용할 수 있습니다.");
			})
			.catch((e) => {
				setEmailExist(1);
				alert("중복된 이메일이 존재합니다.");
			});
	}

	return (
		<div>
			<PageTitle
				title="회원가입"
				isButtonVisible={false}
			/>
			<div className="signup-con">
				<div className="form-con">
					<div className="input-con">
						<TextField label="이름" variant="outlined" value={name} inputProps={{ maxLength: 20 }} onChange={(e: any) => { setName(e.target.value); }} />
						<div className="with-btn">
							<TextField label="핸드폰 번호" variant="outlined" value={phoneNum} inputProps={{ maxLength: 11 }} onChange={(e: any) => { setPhoneNum(e.target.value); }} />
							<Button variant="contained" color={isPhoneNumExist !== 0 ? "primary" : "default"} onClick={checkPhoneNum}>핸드폰 번호 중복 체크</Button>
						</div>
						<div className="birth-con">
							<SelectModule tag="Year" value={birthYear} handleValueChange={(e: any) => { setBirthYear(e.target.value) }} start={1930} end={2022} />
							<SelectModule tag="Month" value={birthMonth} handleValueChange={(e: any) => { setBirthMonth(e.target.value) }} start={1} end={12} />
							<SelectModule tag="Date" value={birthDate} handleValueChange={(e: any) => { setBirthDate(e.target.value) }} start={1} end={30} />
						</div>
						<div className="with-btn">
							<TextField label="이메일" variant="outlined" value={email} onChange={(e: any) => { setEmail(e.target.value); }} />
							<Button variant="contained" color={isEmailExist !== 0 ? "primary" : "default"} onClick={checkEmail}>이메일 중복 체크</Button>
						</div>
						<TextField label="비밀번호" variant="outlined" type="password" value={password} onChange={(e: any) => { setPassword(e.target.value); }} />
						<TextField label="비밀번호 확인" variant="outlined" type="password" value={passwordDual} onChange={(e: any) => { setPasswordDual(e.target.value); }} />
					</div>
					<div className="btn-con">
						<Button className="btn" variant="contained" color="primary" onClick={signUp}>회원가입</Button>
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
						<RadioGroup value={agreement} className="agree-check-con" onChange={(e: any) => { setAgreement(e.target.value) }}>
							<FormControlLabel value="1" control={<Radio color="primary" />} label="동의" />
							<FormControlLabel value="0" control={<Radio color="primary" />} label="동의하지 않음" />
						</RadioGroup>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignUp;