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

const AdminEventExact: React.FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
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
	
	/** 수정 */
	const [title, setTitle] =useState<string>("");
	const [contents, setContents] =useState<string>("");

	useEffect(()=> {
		if(!Event)
			return;
		setTitle(Event.event_title);
		setContents(Event.event_contents);
	}, [Event]);

	const updateEvent = () => {
		axios.put(`${SERVER_URL}/event/update`,{
			"event_id" : Number(match.params.event_id), //2,
			"event_title" : title,//"2021년 6월 둘째주 휴무 일정",
			"event_contents" : contents//"2021년 6월 둘째주 목요일 (10일)은 영화관 보수공사로 인해 휴무입니다. \n 이용에 불편을 드려서 죄송합니다."
		}, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		}).then((res) => {
			alert("이벤트가 정상적으로 수정되었습니다.");
			fetchEventExact();
		})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const deleteEvent = () => {
		axios.delete(`${SERVER_URL}/event/delete/${match.params.event_id}`,{
			headers: {
				TOKEN: AUTH_TOKEN
			}
		}).then((res) => {
			alert("이벤트가 정상적으로 삭제되었습니다.");
			history.push("/admin/event");
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
				<Button variant="contained" color="primary" onClick={updateEvent}>수정하기</Button>
				<Button variant="contained" color="secondary" onClick={deleteEvent}>삭제하기</Button>
			</div>
			<div>
				{
					Event ?
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>이벤트 명</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow key={Event.event_id}>
										<TextField label="이벤트 명" value={title} onChange={(e:any) => setTitle(e.target.value)}/>
									</TableRow>
								</TableBody>
							</Table>
							<div>
								<TextField label="이벤트 내용" value={contents} onChange={(e:any)=> setContents(e.target.value)} multiline={true}/>
							</div>
						</div>
						: "데이터를 불러오는 중입니다."
				}
			</div>
		</div>
	);
}

export default AdminEventExact;