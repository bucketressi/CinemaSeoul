import { Tab, Tabs, TextField, Button, Select, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { BookComponent, PageTitle, PayComponent } from '../../Components';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';

import "../../scss/pages/adminlist.scss";

const AdminList = () => {
	const AUTH_TOKEN = useTokenState();
	const [mode, setMode] = useState<number>(0); // 0 : 예매 내역, 1: 결제 내역
	const [payMode, setPayMode] = useState<number>(0); // 0 : 예매 결제, 1: 상품 결제

	const handleModeChange = (e: any, newValue: number) => {
		setMode(newValue);
	}

	/* 코드 */
	const [code, setCode] = useState<string>("");

	const useCode = () => {
		if(code == ""){
			alert("코드를 입력해주세요.");
			return;
		}

		if(payMode === 0){
			axios.post(`${SERVER_URL}/pay/use/book`,{
				"use_code" : code
			}, {
				headers: {
					"TOKEN": AUTH_TOKEN
				}
			})
				.then((res) => {
					alert("해당 코드가 사용처리되었습니다.");
				})
				.catch((e) => {
					errorHandler(e, true, ["", "이미 사용된 코드입니다.", "", "코드가 존재하지 않습니다.", "사용이 불가한 코드입니다."]);
				});
		}else{
			axios.post(`${SERVER_URL}/pay/use/product`,{
				"use_code" : code
			}, {
				headers: {
					"TOKEN": AUTH_TOKEN
				}
			})
				.then((res) => {
					alert("해당 코드가 사용처리되었습니다.");
				})
				.catch((e) => {
					errorHandler(e, true, ["", "이미 사용된 코드입니다.", "", "코드가 존재하지 않습니다.", "사용이 불가한 코드입니다."]);
				});
		}
	}
	
	return (
		<div>
			<PageTitle
				title="내역 관리"
				isButtonVisible={false}
			/>
			<div className="admin-list-header">
				<Tabs
					value={mode}
					onChange={handleModeChange}
					className="mypage-tab"
					indicatorColor="primary"
				>
					<Tab label="예매내역조회" />
					<Tab label="결제내역조회" />
				</Tabs>
				<div className="code-btn-con">
					<Select value={payMode} onChange={(e:any) => setPayMode(Number(e.target.value))}>
						<MenuItem value={0}>예매코드</MenuItem>
						<MenuItem value={1}>상품코드</MenuItem>
					</Select>
					<TextField label="코드" value={code} onChange={(e: any) => setCode(e.target.value)} />
					<Button variant="contained" color="primary" onClick={useCode}>사용하기</Button>
				</div>
			</div>
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
			</div>
		</div>
	)
}

export default AdminList;