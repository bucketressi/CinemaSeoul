import React, { useState, useEffect } from 'react';
import { PageTitle, SelectModule } from '../../Components';
import { AdminType } from '../../Main/Type';
import "../../scss/pages/adminmypage.scss";
import { useAdminCodeState } from '../../Main/CodeModel';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { useAdminState } from '../../Main/UserModel';
import { getDateString } from '../../Function';

const positionArr = ["사장", "부장", "과장", "대리", "사원", "인턴"];

const AdminMyPage = () => {
	const AUTH_TOKEN = useTokenState();
	const adminCode = useAdminCodeState();
	const adminId = useAdminState();
	const [admin, setAdmin] = useState<AdminType | undefined>(undefined);

	/* 회원가입 정보 */
	const [name, setName] = useState<string>("");
	const [birth, setBirth] = useState<string>("");
	const [phoneNum, setPhoneNum] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordDual, setPasswordDual] = useState<string>("");
	const [position, setPosition] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [startDate, setStartDate] = useState<string>("");

	/* 생년월일 */
	const [birthYear, setBirthYear] = useState<string>("");
	const [birthMonth, setBirthMonth] = useState<string>("");
	const [birthDate, setBirthDate] = useState<string>("");

	/* 중복 체크 */
	const [isPhoneNumExist, setPhoneNumExist] = useState<number>(-1); // -1 아직 안함, 0 중복된 번호 없음, 1 중복된 번호 있음
	const [isEmailExist, setEmailExist] = useState<number>(-1); // -1 아직 안함, 0 중복된 이메일 없음, 1 중복된 이메일 있음

	useEffect(() => {
		fetchAdminInfo();
		setPhoneNumExist(-1);
		setEmailExist(-1);
	}, []);

	useEffect(() => {
		if(!admin)
			return;
		setName(admin.admi_name);
		setBirthYear(admin.birth.substr(0, 4));
		setBirthMonth(Number(admin.birth.substr(4, 2)).toString());
		setBirthDate(Number(admin.birth.substr(6, 2)).toString());
		setPhoneNum(admin.phone_num);
		setEmail(admin.email);
		setPosition(admin.position);
		setAddress(admin.address);
		setStartDate(admin.start_date);
	}, [admin]);

	useEffect(() => {
		setBirth(`${birthYear}${birthMonth}${birthDate}`);
	}, [birthYear, birthMonth, birthDate]);

	const fetchAdminInfo= () => {
		axios.get(`${SERVER_URL}/admin/${adminId}`, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				setAdmin(res.data);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

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

	const checkPhoneNum = () => {
		if(!admin)
			return;
		if (phoneNum === "" || phoneNum.length !== 11) {
			alert("정확한 핸드폰 번호를 입력해주세요.");
			return;
		}
		if (phoneNum === admin.phone_num) {
			// 기존 핸드폰 번호에서 안 바뀌었으면 통과
			setPhoneNumExist(0);
			alert("해당 핸드폰 번호를 사용할 수 있습니다.");
			return;
		}
		axios.post(`${SERVER_URL}/admin/phonecheck`, {
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
		if(!admin)
			return;
		if (email === "" || !email.includes("@")) {
			alert("정확한 이메일을 입력해주세요.");
			return;
		}
		if (email === admin.email) {
			// 기존 이메일에서 안 바뀌었으면 통과
			setEmailExist(0);
			alert("해당 이메일을 사용할 수 있습니다.");
			return;
		}
		axios.post(`${SERVER_URL}/admin/emailcheck`, {
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
	
	const updateInfo = () => {
		if (!preTreatment() || !admin)
			return;
		console.log(admin.admi_name); // todo : api 수정되면 다시 체크
		const admi_auth_code = adminCode.find((code) => code.code_name === admin.admi_name);
		axios.put(`${SERVER_URL}/admin/update`, {
			"admi_id" : adminId,
			"admi_name" : name,//"우희은",
			"birth" : birth,//"20170716",
			"phone_num": phoneNum,//"01045117731",
			"email" : email, //"gmldms@gmail.com",
			"password" : password,//"1234",
			"admi_auth_code" : admi_auth_code, //"120002",
			"position" : position, //"야간아르바이트생",
			"address" : address, //"경기도 부천시",
			"start_date" : startDate, //"20210531"
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("정상적으로 수정되었습니다.")
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<div>
			<PageTitle
				title="마이페이지"
				isButtonVisible={false}
			/>
			<div className="admin-mypage-con">
				<div className="form-con">
					<div className="input-con">
						<TextField label="이름" variant="outlined" value={name} inputProps={{ maxLength: 20 }} onChange={(e: any) => { setName(e.target.value); }} />
						<div>
							<TextField label="핸드폰 번호" variant="outlined" value={phoneNum} inputProps={{ maxLength: 11 }} onChange={(e: any) => { setPhoneNum(e.target.value); }} />
							<Button variant="contained" color={isPhoneNumExist !== 0 ? "primary" : "default"} onClick={checkPhoneNum}>핸드폰 번호 중복 체크</Button>
						</div>
						<div className="birth-con">
							<SelectModule tag="Year" value={birthYear} handleValueChange={(e: any) => { setBirthYear(e.target.value) }} start={1930} end={2022} />
							<SelectModule tag="Month" value={birthMonth} handleValueChange={(e: any) => { setBirthMonth(e.target.value) }} start={1} end={12} />
							<SelectModule tag="Date" value={birthDate} handleValueChange={(e: any) => { setBirthDate(e.target.value) }} start={1} end={30} />
						</div>
						<div>
							<TextField label="이메일" variant="outlined" value={email} onChange={(e: any) => { setEmail(e.target.value); }} />
							<Button variant="contained" color={isEmailExist !== 0 ? "primary" : "default"} onClick={checkEmail}>이메일 중복 체크</Button>
						</div>
						<FormControl>
							<InputLabel id="select-label">직급</InputLabel>
							<Select
								labelId="select-label"
								value={position}
								onChange={(e: any) => setPosition(e.target.value)}
							>
								{
									positionArr.map((pos : string, index : number) => (
										<MenuItem key={index} value={pos}>{pos}</MenuItem>
									))
								}
							</Select>
						</FormControl>
						<TextField label="주소" variant="outlined" value={address} inputProps={{ maxLength: 200 }} onChange={(e: any) => { setAddress(e.target.value); }} />
						<TextField label="시작 일자" variant="outlined" type="date" value={getDateString(startDate)} onChange={(e: any) => { setStartDate(e.target.value.split("-").join("")); }} />
						<TextField label="비밀번호" variant="outlined" type="password" value={password} onChange={(e: any) => { setPassword(e.target.value); }} />
						<TextField label="비밀번호 확인" variant="outlined" type="password" value={passwordDual} onChange={(e: any) => { setPasswordDual(e.target.value); }} />
					</div>
					<div className="btn-con">
						<Button className="btn" variant="contained" color="primary" onClick={updateInfo}>수정</Button>
					</div>
				</div>
				<div className="img-con">
					<img src="/img/thanku.png" alt="감사합니다."/>
				</div>
			</div>
		</div>
	);
}

export default AdminMyPage;