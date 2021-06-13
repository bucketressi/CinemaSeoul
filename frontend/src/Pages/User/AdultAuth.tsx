import { Button, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { ModalComponent } from '../../Components';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { useUserState } from '../../Main/UserModel';
import { useTokenState } from '../../Main/TokenModel';
import { errorHandler } from '../../Main/ErrorHandler';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { getDateString } from '../../Function';

const AdultAuth = () => {
	const history = useHistory();
	const AUTH_TOKEN = useTokenState();
	const userId = useUserState();

	const [phoneNum, setPhoneNum] = useState<string>("");
	const [birth, setBirth] = useState<string>("");

	useEffect(()=> {
		fetchUser();
	}, [])

	const fetchUser = () => {
		axios.get(`${SERVER_URL}/user/${userId}`, {
			headers : {
				TOKEN : AUTH_TOKEN
			}
		})
			.then((res) => {
				if(!res.data)
					return;
				console.log(res.data);
				setPhoneNum(res.data.phone_num);
				setBirth(res.data.birth);
			})
			.catch((e) => {
				return null; // 비회원
			});
	}

	const checkAdult = () => {
		if(birth === "" || phoneNum === ""){
			alert("생년월일과 휴대전화번호를 정확히 입력해주세요.");
			return;
		}

		axios.post(`${SERVER_URL}/user/adult`,{
			"birth" : birth,
			"phone_num" : phoneNum
		}, {
			headers : {
				TOKEN : AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("성공적으로 성인인증 되었습니다. 예매 창으로 돌아갑니다.");
				history.push("/book");
			})
			.catch((e) => {
				if(confirm("성인인증에 실패하였습니다. 정보를 변경하러 가시겠습니까?")){
					history.push("/myPage");
				}
			});
	}

	return (
		<ModalComponent
			title="성인인증"
			open={true}
			setOpen={() => {}}
			button="예매로 돌아가기"
			buttonOnClick={() => {history.push("/book")}}
		>
			<div>
				<TextField value={phoneNum} onChange={(e: any) => setPhoneNum(e.target.value)} label="휴대전화번호" inputProps={{maxLength: 11}}/>
				<TextField type="date" value={getDateString(birth)} onChange={(e: any) => setBirth(e.target.value.split("-").join(""))} label="생년월일" InputLabelProps={{shrink: true}}/>
			</div>
			<Button variant="contained" color="primary" onClick={checkAdult}>성인인증하기</Button>
		</ModalComponent>
	)
}

export default AdultAuth;