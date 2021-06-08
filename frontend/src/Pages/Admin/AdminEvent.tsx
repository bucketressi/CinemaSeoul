import React, { useEffect, useState } from 'react';
import { ModalComponent, PageTitle } from '../../Components';
import { EventComponentType } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { Button, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Pagination } from '@material-ui/lab';
import { useTokenState } from '../../Main/TokenModel';

import "../../scss/pages/adminevent.scss";

const AdminEvent = () => {
	const AUTH_TOKEN = useTokenState();
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
	
	/** 추가 */
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [title, setTitle] = useState<string>("");
	const [contents, setContents] = useState<string>("");

	const handleOpenModal = () => {
		setOpenModal(true);
	}

	const addEvent = () => {
		axios.post(`${SERVER_URL}/event/add`, {
			"event_title" : title,//string,
			"event_contents" : contents,//string
		}, {
			headers: {
				TOKEN : AUTH_TOKEN
			}
		}).then((res) => {
			alert("이벤트가 정상적으로 추가되었습니다.");
			fetchEvent();
			setOpenModal(false);
		})
			.catch((e) => {
				errorHandler(e, true);
			});
	}



	return (
		<>
			<PageTitle
				title="이벤트"
				isButtonVisible={false}
			/>
			<div className="event-wrap">
				<div className="add-con">
					<Button variant="outlined" color="primary" onClick={handleOpenModal}>이벤트 추가</Button>
				</div>
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
									<TableRow key={event.event_id} onClick={() => history.push(`/admin/event/${event.event_id}`)}>
										<TableCell className="table-content">{event.admi_name?event.admi_name:"관리자"}</TableCell>
										<TableCell className="table-content-title">{event.event_title}</TableCell>
									</TableRow>
								))
							}
						</TableBody>
					</Table>
					<Pagination className="pagination" count={totalPage} page={page} onChange={handlePageChange} />
				</div>
				<ModalComponent
					open={openModal}
					setOpen={setOpenModal}
					title="이벤트 추가"
					button="추가"
					buttonOnClick={addEvent}
				>
					<div className="event-modal">
						<TextField
							className="event-input"
							label="제목"
							placeholder="제목"
							InputLabelProps={{shrink:true}}
							inputProps={{ maxLength: 50 }}
							variant="outlined"
							value={title}
							onChange={(e: any) => setTitle(e.target.value)}
						/>
						<TextField
							className="event-input"
							label="내용"
							placeholder="내용"
							InputLabelProps={{shrink:true}}
							variant="outlined"
							inputProps={{ maxLength: 1000 }}
							rows={5}
							multiline={true}
							value={contents}
							onChange={(e: any) => setContents(e.target.value)}
						/>
					</div>
				</ModalComponent>
			</div>
		</>
	);
}

export default AdminEvent;