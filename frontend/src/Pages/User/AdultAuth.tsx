import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { ModalComponent } from '../../Components';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { useUserState } from '../../Main/UserModel';
import { useTokenState } from '../../Main/TokenModel';
import { errorHandler } from '../../Main/ErrorHandler';
import { useHistory } from 'react-router';

const AdultAuth = () => {
	const history = useHistory();
	const AUTH_TOKEN = useTokenState();
	const userId = useUserState();

	const fetchUser = () => {
		return axios.get(`${SERVER_URL}/user/${userId}`, {
			headers : {
				TOKEN : AUTH_TOKEN
			}
		})
			.then((res) => {
				if(!res.data)
					return;
				return res.data;
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const checkAdult = () => {
		fetchUser().then((res) => {
			console.log(res);
			axios.post(`${SERVER_URL}/user/adult`,{
				"birth" : res.birth,
				"phone_num" : res.phone_num
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
		})
	}

	return (
		<ModalComponent
			title="성인인증"
			open={true}
			setOpen={() => {}}
			button="예매로 돌아가기"
			buttonOnClick={() => {history.push("/book")}}
		>
			<Button variant="contained" color="primary" onClick={checkAdult}>성인인증하기</Button>
		</ModalComponent>
	)
}

export default AdultAuth;