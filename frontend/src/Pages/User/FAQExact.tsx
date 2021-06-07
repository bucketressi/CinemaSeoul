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

const FAQExact: React.FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
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

	return (
		<div>
			<PageTitle
				title="FAQ 세부"
				isButtonVisible={true}
			/>
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
										<TableCell>{FAQ.faq_title}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
							<div>
								{FAQ.faq_contents}
							</div>
						</div>
						: "데이터를 불러오는 중입니다."
				}
			</div>
		</div>
	);
}

export default FAQExact;