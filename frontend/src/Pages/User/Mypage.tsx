import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { ModalComponent, PageTitle } from '../../Components';
import "../../scss/pages/mypage.scss";

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';
import { useUserState } from '../../Main/UserModel';
import { useHistory } from 'react-router-dom';
import { MypageUserType} from '../../Main/Type';
import { MypageBook, MypagePay } from '.';

const Mypage = () => {
	const userId = useUserState();
	const AUTH_TOKEN = useTokenState();
	const history = useHistory();
	const [mode, setMode] = useState<number>(0); // 0 : 결제내역조회, 1 : 내가 본 영화, 2 : 1:1문의, 3 : 정보 관리

	const [userInfo, setUserInfo] = useState<MypageUserType | undefined>(undefined); // user 전체 정보

	useEffect(() => { // 로그인 된 유저만 마이페이지 가능, 유저 정보 받아오기
		if (userId === undefined) {
			alert("로그인 후 이용 가능합니다.")
			history.push("/login");
		}
		fetchUserInfo();
	}, []);

	const handleModeChange = (e: any, newValue: number) => {
		setMode(newValue);
	}

	const fetchUserInfo = () => {
		axios.get(`${SERVER_URL}/user/${userId}`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				setUserInfo(res.data);
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
			{
				userInfo &&
				<div className="mypage-con">
					<div className="pointer-con">
						<div>
							등급 : {userInfo?.user_type}
						</div>
						<div>
							현재 포인트 : {userInfo?.curr_point}포인트
						</div>
						<div>
							누적 포인트 : {userInfo?.accu_point}포인트
						</div>
					</div>
					<Tabs
						value={mode}
						onChange={handleModeChange}
						className="mypage-tab"
						indicatorColor="primary"
					>
						<Tab label="예매내역조회" />
						<Tab label="결제내역조회" />
						<Tab label="내가 본 영화" />
						<Tab label="1:1 문의" />
						<Tab label="정보 관리" />
					</Tabs>
					<div className="content-con">
						<div
							role="tabpanel"
							hidden={mode !== 0}
						>
							<MypageBook
								mode={mode}
							/>
						</div>
						<div
							role="tabpanel"
							hidden={mode !== 1}
						>
							<MypagePay
								mode={mode}
							/>
						</div>
						<div
							role="tabpanel"
							hidden={mode !== 2}
						>
							2
						</div>
						<div
							role="tabpanel"
							hidden={mode !== 3}
						>
							3
						</div>
						<div
							role="tabpanel"
							hidden={mode !== 4}
						>
							4
						</div>
					</div>
				</div>
			}
		</div>
	);
}

export default Mypage;