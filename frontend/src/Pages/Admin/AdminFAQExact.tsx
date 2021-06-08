import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FAQExactType } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { Button, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useTokenState } from '../../Main/TokenModel';

import "../../scss/pages/adminfaq.scss";

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
		<>
			<PageTitle
				title="FAQ 세부"
				isButtonVisible={true}
			/>
			<div className="faq-wrap">
				<div className="modify-con">
					<Button variant="outlined" color="primary" onClick={updateFAQ}>수정하기</Button>
					<Button variant="outlined" color="secondary" onClick={deleteFAQ}>삭제하기</Button>
				</div>
				<div>
					{
						FAQ ?
							<div className="faq-con">
								<Table>
									<TableHead>
										<TableRow>
											<TableCell className="table-title">작성자</TableCell>
											<TableCell className="table-title">FAQ 제목</TableCell>
										</TableRow>
									</TableHead>
									<TableBody className="table-body">
										<TableRow key={FAQ.faq_id}>
											<TableCell className="table-content">{FAQ.admi_name}</TableCell>
											<TableCell className="table-content">
												<TextField
													className="title-input"
													variant="outlined"
													placeholder="제목을 입력하세요."
													inputProps={{ maxLength: 50 }}
													value={title}
													onChange={(e:any) => setTitle(e.target.value)}
												/>
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
								<div className="faq-content">
									<TextField
										label="내용"	
										placeholder="내용을 입력하세요."
										InputLabelProps={{shrink:true}}
										variant="outlined"
										inputProps={{ maxLength: 600 }}
										value={contents}
										onChange={(e:any)=> setContents(e.target.value)}
										multiline={true}
										rows={10}
									/>
								</div>
							</div>
							: "데이터를 불러오는 중입니다."
					}
				</div>
			</div>
		</>
	);
}

export default AdminFAQExact;