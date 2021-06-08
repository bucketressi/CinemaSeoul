import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { EventExactType } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { Button, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useTokenState } from '../../Main/TokenModel';

interface MatchParams {
	event_id: string
}
import { PageTitle } from '../../Components';

const EventExact: React.FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
	const AUTH_TOKEN = useTokenState();
	const history = useHistory();
	const [Event, setEvent] = useState<EventExactType | undefined>(undefined);

	useEffect(() => {
		fetchEventExact();
	}, []);

	const fetchEventExact = () => {
		axios.get(`${SERVER_URL}/event/${match.params.event_id}`, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		}).then((res) => {
			if (!res.data)
				return;
			setEvent(res.data);
		})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<div>
			<PageTitle
				title="이벤트 세부"
				isButtonVisible={true}
			/>
			<div>
				{
					Event ?
						<div className="event-con">
							<Table>
								<TableHead>
									<TableRow>
										<TableCell className="table-title">이벤트 명</TableCell>
									</TableRow>
								</TableHead>
								<TableBody className="table-body">
									<TableRow key={Event.event_id}>
										<TableCell className="table-content">{Event.event_title}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
							<div className="event-content">
								{Event.event_contents}
							</div>
						</div>
						: "데이터를 불러오는 중입니다."
				}
			</div>
		</div>
	);
}

export default EventExact;