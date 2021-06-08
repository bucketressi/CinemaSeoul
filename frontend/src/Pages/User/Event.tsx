import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../Components';
import { EventComponentType } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Pagination } from '@material-ui/lab';

import "../../scss/pages/event.scss";

const Event = () => {
	const history = useHistory();
	const [page, setPage] = useState<number>(1);
	const [totalPage, setTotalPage] = useState<number>(1);

	const [EventList, setEventList] = useState<EventComponentType[] | undefined>(undefined);

	useEffect(() => {
		fetchEvent();
	},[]);
	
	useEffect(() => {
		fetchEvent();
	},[page]);

	const fetchEvent = () => {
		axios.post(`${SERVER_URL}/event/list`, {
			page : page
		}).then((res) => {
			if (!res.data || !res.data.event_list)
				return;
			setEventList(res.data.event_list);
			setTotalPage(res.data.totalpage);
		})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const handlePageChange = (e: any, pageNumber: number) => { setPage(pageNumber); };


	return (
		<div>
			<PageTitle
				title="이벤트"
				isButtonVisible={false}
			/>
			<div className="event-con">
				<Table>
					<TableHead>
						<TableRow>
							<TableCell className="table-title">작성자</TableCell>
							<TableCell className="table-title">이벤트 제목</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							EventList &&
							EventList.map((event) => (
								<TableRow key={event.event_id} onClick={() => history.push(`/event/${event.event_id}`)}>
									<TableCell className="table-content">{event.admi_name?event.admi_name:"관리자"}</TableCell>
									<TableCell className="table-content-title">{event.event_title}</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
				<Pagination className="pagination" count={totalPage} page={page} onChange={handlePageChange} />
			</div>
		</div>
	);
}

export default Event;