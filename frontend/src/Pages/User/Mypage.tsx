import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Button, TextField, TableBody, TableRow, TableCell, TableHead, Table, TableContainer } from '@material-ui/core';
import { ModalComponent, PageTitle, BookComponent } from '../../Components';
import "../../scss/pages/mypage.scss";

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';
import { useUserState } from '../../Main/UserModel';
import { useHistory } from 'react-router-dom';
import { MypageUserType, MypagePointType, MypageAuthType } from '../../Main/Type';
import { MypageMovie, MypageInfo, MypageAsk } from '.';
import { getDateString, getDateStringFromDate } from '../../Function';
import PayComponent from '../../Components/PayComponent';

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
		if (userId === undefined)
			return;
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

	// 포인트 내역 조회 모달
	const [point, setPoint] = useState<MypagePointType[] | undefined>(undefined); // 포인트 내역 정보
	const [startDate, setStartDate] = useState<string>(getDateStringFromDate(new Date()));
	const [openPointModal, setOpenPointModal] = useState<boolean>(false);

	useEffect(() => {
		if (!openPointModal)
			return;
		fetchPointList();
	}, [startDate, openPointModal]);

	const fetchPointList = () => {
		if (userId === undefined)
			return;
		axios.get(`${SERVER_URL}/point/${userId}/${startDate}`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data || !res.data.point)
					return;
				setPoint(res.data.point);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const handlePointModal = () => {
		setOpenPointModal(true);
	}

	//등급 변경 내역 조회 모달
	const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
	const [authList, setAuthList] = useState<MypageAuthType[] | undefined>(undefined);

	useEffect(() => {
		if (!openAuthModal)
			return;
		fetchAuthList();
	}, [openAuthModal]);

	const fetchAuthList = () => {
		if (userId === undefined)
			return;
		axios.get(`${SERVER_URL}/usertyperecord/${userId}`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data)
					return;
				setAuthList(res.data);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const handleAuthModal = () => {
		setOpenAuthModal(true);
	}

	return (
		<div>
			<PageTitle title="마이페이지" isButtonVisible={false} />
			{
				userInfo ?
					<div className="mypage-con">
						<div className="pointer-con">
							<Table>
								<TableHead>
									<TableRow>
										<TableCell className="table-title">등급</TableCell>
										<TableCell className="table-title">현재 포인트</TableCell>
										<TableCell className="table-title">누적 포인트</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell className="table-content">{userInfo?.user_type}</TableCell>
										<TableCell className="table-content">{userInfo?.curr_point} P</TableCell>
										<TableCell className="table-content">{userInfo?.accu_point} P</TableCell>
									</TableRow>
								</TableBody>
							</Table>
							<div className="pointer-record-con">
								<div className="pointer-record">
									<Button className="pointer-btn" variant="outlined" color="primary" onClick={handlePointModal}>포인트 내역 조회</Button>
									<Button className="pointer-btn" variant="outlined" color="primary" onClick={handleAuthModal}>등급 변경 이력 조회</Button>
								</div>
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
								<BookComponent
									mode={mode}
								/>
							</div>
							<div
								role="tabpanel"
								hidden={mode !== 1}
							>
								<PayComponent
									mode={mode}
								/>
							</div>
							<div
								role="tabpanel"
								hidden={mode !== 2}
							>
								<MypageMovie
									mode={mode}
								/>
							</div>
							<div
								role="tabpanel"
								hidden={mode !== 3}
							>
								<MypageAsk
									mode={mode}
								/>
							</div>
							<div
								role="tabpanel"
								hidden={mode !== 4}
							>
								<MypageInfo
									mode={mode}
									userInfo={userInfo}
									fetchUserInfo={fetchUserInfo}
								/>
							</div>
						</div>
					</div>
					: <div>정보를 불러오는 중입니다.</div>
			}
			<ModalComponent
				open={openPointModal}
				setOpen={setOpenPointModal}
				title="포인트 내역 조회"
			>
				<div className="point-record-modal">
					<TextField className="record-search" type="date" label="조회 시작 일자" value={getDateString(startDate)} onChange={(e: any) => { setStartDate(e.target.value.split("-").join("")) }} />
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell className="bold-text">일자</TableCell>
									<TableCell className="bold-text">타입</TableCell>
									<TableCell className="bold-text">포인트</TableCell>
									<TableCell className="bold-text">메시지</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									point &&
									point.map((p) => (
										<TableRow key={p.poin_id}>
											<TableCell>{p.poin_datetime}</TableCell>
											<TableCell>{p.poin_type}</TableCell>
											<TableCell>{p.poin_amount}</TableCell>
											<TableCell>{p.message}</TableCell>
										</TableRow>
									))
								}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</ModalComponent>
			<ModalComponent
				open={openAuthModal}
				setOpen={setOpenAuthModal}
				title="등급 변경 조회"
			>
				{
					authList &&
					<div className="point-record-modal">
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell className="bold-text">변경 일자</TableCell>
										<TableCell className="bold-text">변경 시 포인트</TableCell>
										<TableCell className="bold-text">변경 등급</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										authList.map((auth) => (
											<TableRow key={auth.upda_datetime}>
												<TableCell>{auth.upda_datetime}</TableCell>
												<TableCell>{auth.accu_point}</TableCell>
												<TableCell>{auth.user_type}</TableCell>
											</TableRow>
										))
									}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				}
			</ModalComponent>
		</div>
	);
}

export default Mypage;