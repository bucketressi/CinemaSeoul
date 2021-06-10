import React, { useEffect, useState } from 'react';
import { ModalComponent, PageTitle } from '../../Components';
import { NoticeComponentType } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { Button, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useTokenState } from '../../Main/TokenModel';
import { Pagination } from '@material-ui/lab';

import "../../scss/pages/adminnotice.scss";

const AdminNotice = () => {
	const AUTH_TOKEN = useTokenState();
	const history = useHistory();
	const [page, setPage] = useState<number>(1);
	const [totalPage, setTotalPage] = useState<number>(1);

	const [noticeList, setNoticeList] = useState<NoticeComponentType[] | undefined>(undefined);

	useEffect(() => {
		fetchNotice();
	},[]);

	useEffect(() => {
		fetchNotice();
	},[page]);

	const fetchNotice = () => {
		axios.post(`${SERVER_URL}/notice/list`, {
			page : page
		}).then((res) => {
			if (!res.data || !res.data.noti_list)
				return;
			setNoticeList(res.data.noti_list);
			setTotalPage(res.data.totalpage);
		})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	/** 추가 */
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [title, setTitle] = useState<string>("");
	const [contents, setContents] = useState<string>("");

	const handleOpenModal = () => {
		setOpenModal(true);
	}

	const addNotice = () => {
		if(title === ""){
			alert("제목을 입력해주세요.");
			return;
		}
		axios.post(`${SERVER_URL}/notice/add`, {
			"noti_title" : title,// "2021년 6월 넷째주 휴무 일정",
			"noti_contents" : contents,//"2021년 6월 넷재주 수요일 (23일)은 영화관 정기휴무입니다. \n 이용에 불편을 드려서 죄송합니다."
		}, {
			headers: {
				TOKEN : AUTH_TOKEN
			}
		}).then((res) => {
			alert("공지사항이 정상적으로 추가되었습니다.");
			fetchNotice();
			setOpenModal(false);
		})
			.catch((e) => {
				errorHandler(e, true);
			});
	}
	const handlePageChange = (e: any, pageNumber: number) => { setPage(pageNumber); };

	

	return (
		<>
			<PageTitle
				title="공지사항"
				isButtonVisible={false}
			/>
			<div className="notice-wrap">
				<div className="add-con">
					<Button variant="outlined" color="primary" onClick={handleOpenModal}>공지사항 추가</Button>
				</div>
				<div className="notice-con">
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className="table-title">작성자</TableCell>
								<TableCell className="table-title">공지사항 제목</TableCell>
								<TableCell className="table-title">작성 날짜</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								noticeList &&
								noticeList.map((notice) => (
									<TableRow key={notice.noti_id} onClick={() => history.push(`/admin/notice/${notice.noti_id}`)}>
										<TableCell className="table-content">{notice.admi_name}</TableCell>
										<TableCell className="table-content-title">{notice.noti_title}</TableCell>
										<TableCell className="table-content">{notice.crea_datetime}</TableCell>
									</TableRow>
								))
							}
						</TableBody>
					</Table>
					<Pagination className="pagination" count={totalPage} page={page} onChange={handlePageChange} />
				</div>
			</div>
			<ModalComponent
				open={openModal}
				setOpen={setOpenModal}
				title="공지사항 추가"
				button="추가"
				buttonOnClick={addNotice}
			>
				<div className="notice-modal">
					<TextField
						className="notice-input"
						label="제목"
						placeholder="제목"
						InputLabelProps={{shrink:true}}
						variant="outlined"
						inputProps={{ maxLength: 50 }}
						value={title}
						onChange={(e: any) => setTitle(e.target.value)}
					/>
					<TextField
						className="notice-input"
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
		</>
	);
}

export default AdminNotice;