import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FAQExactType } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { Button, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useTokenState } from '../../Main/TokenModel';

interface MatchParams {
	faq_id: string
}
import { PageTitle } from '../../Components';

const AdminFAQExact: React.FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
	const AUTH_TOKEN = useTokenState();
	const history = useHistory();
	const [FAQ, setFAQ] = useState<FAQExactType | undefined>(undefined);

	useEffect(() => {
		fetchFAQExact();
	}, []);

	const fetchFAQExact = () => {
		axios.get(`${SERVER_URL}/faq/${match.params.faq_id}`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		}).then((res) => {
			if (!res.data)
				return;
			setFAQ(res.data);
		})
			.catch((e) => {
				errorHandler(e, true);
			});
	}
	
	/** 수정 */
	const [title, setTitle] =useState<string>("");
	const [contents, setContents] =useState<string>("");

	useEffect(()=> {
		if(!FAQ)
			return;
		setTitle(FAQ.faq_title);
		setContents(FAQ.faq_contents);
	}, [FAQ]);

	const updateFAQ = () => {
		axios.put(`${SERVER_URL}/faq/update`,{
			"faq_id" : Number(match.params.faq_id), //2,
			"faq_title" : title,//"2021년 6월 둘째주 휴무 일정",
			"faq_contents" : contents//"2021년 6월 둘째주 목요일 (10일)은 영화관 보수공사로 인해 휴무입니다. \n 이용에 불편을 드려서 죄송합니다."
		}, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		}).then((res) => {
			alert("FAQ가 정상적으로 수정되었습니다.");
			fetchFAQExact();
		})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const deleteFAQ = () => {
		axios.delete(`${SERVER_URL}/faq/delete/${match.params.faq_id}`,{
			headers: {
				TOKEN: AUTH_TOKEN
			}
		}).then((res) => {
			alert("FAQ가 정상적으로 삭제되었습니다.");
			history.push("/admin/faq");
		})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<div>
			<PageTitle
				title="FAQ 세부"
				isButtonVisible={true}
			/>
			<div>
				<Button variant="contained" color="primary" onClick={updateFAQ}>수정하기</Button>
				<Button variant="contained" color="secondary" onClick={deleteFAQ}>삭제하기</Button>
			</div>
			<div>
				{
					FAQ ?
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>작성자</TableCell>
										<TableCell>FAQ 제목</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow key={FAQ.faq_id}>
										<TableCell>{FAQ.admi_name}</TableCell>
										<TextField value={title} onChange={(e:any) => setTitle(e.target.value)}/>
									</TableRow>
								</TableBody>
							</Table>
							<div>
								<TextField value={contents} onChange={(e:any)=> setContents(e.target.value)} multiline={true}/>
							</div>
						</div>
						: "데이터를 불러오는 중입니다."
				}
			</div>
		</div>
	);
}

export default AdminFAQExact;