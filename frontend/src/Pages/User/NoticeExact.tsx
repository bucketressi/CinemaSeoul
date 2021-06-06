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
										<TableCell>{notice.noti_title}</TableCell>
										<TableCell>{notice.crea_datetime}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
							<div>
								{notice.noti_contents}
							</div>
						</div>
						: "데이터를 불러오는 중입니다."
				}
			</div>
		</div>
	);
}

export default NoticeExact;