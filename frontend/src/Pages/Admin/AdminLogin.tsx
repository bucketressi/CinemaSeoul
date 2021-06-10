import React, { useEffect, useState } from 'react';
import { TextField, Checkbox, Button } from '@material-ui/core';
import { useAdminLogin, useAdminState } from '../../Main/UserModel';
import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { ModalComponent } from '../../Components';
import { useHistory } from 'react-router';

const AdminLogin = () => {
	// 관리자 로그인 페이지
	const adminId = useAdminState();
	const adminLogin = useAdminLogin();
	const history = useHistory();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	/* 아이디, 비밀번호 찾기 */
	const [openIdModal, setOpenIdModal] = useState<boolean>(false);
	const [openPasswordModal, setOpenPasswordModal] = useState<boolean>(false);
	const [modalName, setModalName] = useState<string>("");
	const [modalPhoneNum, setModalPhoneNum] = useState<string>("");
	const [foundedId, setFoundedId] = useState<string>("");

	const [modalEmail, setModalEmail] = useState<string>("");
	const [modalPassword, setModalPassword] = useState<string>("");

	const openFindIdModal = () => {setOpenIdModal(true);};
	const openFindPWModal = () => {setOpenPasswordModal(true);};

	const handleAdminLogin = () => {
		adminLogin(email, password);
	}

	useEffect(() => {
		if(!adminId)
			return;
		alert("이미 로그인되어 있습니다.");
		history.push("/admin/main");
	},[]);

	/** 아이디 비밀번호 찾기 */
	
	const findId = () => {
		if(modalPhoneNum === "" || modalPhoneNum.length !== 11 || isNaN(Number(modalPhoneNum))){
			alert("알맞은 핸드폰 번호를 입력해주세요.");
			return;
		}
		axios.post(`${SERVER_URL}/admin/findId`, {
			"admi_name" : modalName,
			"phone_num" : modalPhoneNum
		})
			.then((res) => {
				if(!res || !res.data)
					return;
				setFoundedId(res.data);
				setModalEmail(res.data);
			})
			.catch((e) => {
				errorHandler(e, true, ["","입력한 이름에 해당하는 관리자 ID가 없습니다."]);
			});
	}
	
	const setNewPW = () => {
		if(isNaN(Number(modalPhoneNum))){
			alert("알맞은 핸드폰 번호를 입력해주세요.");
			return;
		}
		if (!modalEmail.includes("@")) {
			alert("이메일 형식을 확인해주세요.");
			return;
		}
		axios.post(`${SERVER_URL}/admin/resetPw`, {
			"admi_name" : modalName,
			"phone_num" : modalPhoneNum,//"01012345678",
			"email" : modalEmail,//"sample@naver.com",
			"password" : modalPassword,//"1234"
		})
			.then((res) => {
				setOpenPasswordModal(false);
				alert("비밀번호가 성공적으로 수정되었습니다.");
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}


	return (
		<div className="user-form">
			<div className="form-con">
				<div className="input-con">
					<TextField variant="outlined" label="이메일" placeholder="이메일을 입력해주세요."  inputProps={{ maxLength: 40 }} onChange={(e) => { setEmail(e.target.value); }} />
					<TextField variant="outlined" label="비밀번호" type="password" placeholder="비밀번호를 입력해주세요."  inputProps={{ maxLength: 100 }} onChange={(e) => { setPassword(e.target.value); }} />
				</div>
				<Button className="btn" variant="contained" color="primary" onClick={handleAdminLogin}>로그인</Button>
				<div className="under-menu">
					<div className="checkbox-con">
						<Checkbox color="primary" />
						<p>아이디저장</p>
					</div>
					<div className="sub-menu">
						<span onClick={openFindIdModal}>아이디 찾기</span>
						<span className="last" onClick={openFindPWModal}>비밀번호 변경</span>
					</div>
				</div>
			</div>
			<div className="right-con">
				<img src="/img/picture.jpg" alt="홍보 이미지" />
			</div>
			<ModalComponent
				open={openIdModal}
				setOpen={setOpenIdModal}
				title="아이디 찾기"
			>
				<div>
					<TextField label="이름" variant="outlined" value={modalName} onChange={(e: any) => setModalName(e.target.value)} inputProps={{ maxLength: 20 }}/>
					<TextField label="핸드폰 번호" variant="outlined" value={modalPhoneNum} onChange={(e: any) => setModalPhoneNum(e.target.value)}  inputProps={{ maxLength: 11 }}/>
					<Button variant="contained" color="primary" onClick={findId}>아이디 찾기</Button>
					<div>아이디 : {foundedId}</div>
				</div>
			</ModalComponent>
			<ModalComponent
				open={openPasswordModal}
				setOpen={setOpenPasswordModal}
				title="비밀번호 변경"
			>
				<div>
					<TextField label="이름" variant="outlined" value={modalName} onChange={(e: any) => setModalName(e.target.value)}  inputProps={{ maxLength: 20 }}/>
					<TextField label="핸드폰 번호"  variant="outlined"value={modalPhoneNum} onChange={(e: any) => setModalPhoneNum(e.target.value)}  inputProps={{ maxLength: 11 }}/>
					<TextField label="아이디(이메일)" variant="outlined" value={modalEmail} onChange={(e: any) => setModalEmail(e.target.value)}  inputProps={{ maxLength: 40 }}/>
					<TextField label="변경할 비밀번호" variant="outlined" type="password" value={modalPassword} onChange={(e: any) => setModalPassword(e.target.value)}  inputProps={{ maxLength: 100 }}/>
					<Button variant="contained" color="primary" onClick={setNewPW}>비밀번호 변경</Button>
				</div>
			</ModalComponent>
		</div>
	);
};

export default AdminLogin;