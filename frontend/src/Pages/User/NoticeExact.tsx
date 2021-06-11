import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { NoticeExactType } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { Button, InputBase, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useTokenState } from '../../Main/TokenModel';

import "../../scss/pages/notice.scss";

interface MatchParams {
	notice_id: string
}
import { PageTitle } from '../../Components';

const NoticeExact: React.FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
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

	return (
		<div>
			<PageTitle
				title="공지사항 세부"
				isButtonVisible={true}
			/>
			<div>
				{
					notice ?
						<div className="notice-con">
							<Table>
								<TableHead>
									<TableRow>
										<TableCell className="table-title">작성자</TableCell>
										<TableCell className="table-title">공지사항 제목</TableCell>
										<TableCell className="table-title">작성 날짜</TableCell>
									</TableRow>
								</TableHead>
								<TableBody className="table-body">
									<TableRow key={notice.noti_id}>
										<TableCell className="table-content">{notice.admi_name}</TableCell>
										<TableCell className="table-content-title">{notice.noti_title}</TableCell>
										<TableCell className="table-content">{notice.crea_datetime}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
							<div className="notice-content">
								<InputBase value={notice.noti_contents} disabled={true} multiline={true} inputProps={{ 'aria-label': 'naked' }}/>
							</div>
						</div>
						: "데이터를 불러오는 중입니다."
				}
			</div>
		</div>
	);
}

export default NoticeExact;