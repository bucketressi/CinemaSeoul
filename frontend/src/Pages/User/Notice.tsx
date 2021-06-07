import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../Components';
import { NoticeComponentType } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Pagination } from '@material-ui/lab';

const Notice = () => {
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
	const handlePageChange = (e: any, pageNumber: number) => { setPage(pageNumber); };

	return (
		<div>
			<PageTitle
				title="공지사항"
				isButtonVisible={false}
			/>
			<div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>작성자</TableCell>
							<TableCell>공지사항 제목</TableCell>
							<TableCell>작성 날짜</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							noticeList &&
							noticeList.map((notice) => (
								<TableRow key={notice.noti_id} onClick={() => history.push(`/notice/${notice.noti_id}`)}>
									<TableCell>{notice.admi_name}</TableCell>
									<TableCell>{notice.noti_title}</TableCell>
									<TableCell>{notice.crea_datetime}</TableCell>
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

export default Notice;