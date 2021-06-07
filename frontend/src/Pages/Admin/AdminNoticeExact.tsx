import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { NoticeExactType } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { Button, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useTokenState } from '../../Main/TokenModel';

interface MatchParams {
	notice_id: string
}
import { PageTitle } from '../../Components';

const AdminNoticeExact: React.FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
	const AUTH_TOKEN = useTokenState();
	const history = useHistory();
	const [notice, setNotice] = useState<NoticeExactType | undefined>(undefined);

	useEffect(() => {
		fetchNoticeExact();
	}, []);

	const fetchNoticeExact = () => {
		axios.get(`${SERVER_URL}/notice/${match.params.notice_id}`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		}).then((res) => {
			if (!res.data)
				return;
			setNotice(res.data);
		})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	/** 수정 */
	const [title, setTitle] =useState<string>("");
	const [contents, setContents] =useState<string>("");

	useEffect(()=> {
		if(!notice)
			return;
		setTitle(notice.noti_title);
		setContents(notice.noti_contents);
	}, [notice]);

	const updateNotice = () => {
		axios.put(`${SERVER_URL}/notice/update`,{
			"noti_id" : Number(match.params.notice_id), //2,
			"noti_title" : title,//"2021년 6월 둘째주 휴무 일정",
			"noti_contents" : contents//"2021년 6월 둘째주 목요일 (10일)은 영화관 보수공사로 인해 휴무입니다. \n 이용에 불편을 드려서 죄송합니다."
		}, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		}).then((res) => {
			alert("공지사항이 정상적으로 수정되었습니다.");
			fetchNoticeExact();
		})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const deleteNotice = () => {
		axios.delete(`${SERVER_URL}/notice/delete/${match.params.notice_id}`,{
			headers: {
				TOKEN: AUTH_TOKEN
			}
		}).then((res) => {
			alert("공지사항이 정상적으로 삭제되었습니다.");
			history.push("/notice");
		})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<div>
			<PageTitle
				title="공지사항 세부"
				isButtonVisible={true}
			/>
			<div>
				<Button variant="contained" color="primary" onClick={updateNotice}>수정하기</Button>
				<Button variant="contained" color="secondary" onClick={deleteNotice}>삭제하기</Button>
			</div>
			<div>
				{
					notice ?
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>작성자</TableCell>
										<TableCell>공지사항 제목</TableCell>
										<TableCell>작성 날짜</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow key={notice.noti_id}>
										<TableCell>{notice.admi_name}</TableCell>
										<TableCell>
											<TextField value={title} onChange={(e:any) => setTitle(e.target.value)}/>
										</TableCell>
										<TableCell>{notice.crea_datetime}</TableCell>
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

export default AdminNoticeExact;