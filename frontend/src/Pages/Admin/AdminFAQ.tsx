import React, { useEffect, useState } from 'react';
import { ModalComponent, PageTitle } from '../../Components';
import { FAQComponentType } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Pagination } from '@material-ui/lab';
import { useTokenState } from '../../Main/TokenModel';

import "../../scss/pages/adminfaq.scss";

const AdminFAQ = () => {
	const AUTH_TOKEN = useTokenState();
	const history = useHistory();
	const [page, setPage] = useState<number>(1);
	const [totalPage, setTotalPage] = useState<number>(1);

	const [FAQList, setFAQList] = useState<FAQComponentType[] | undefined>(undefined);

	useEffect(() => {
		fetchFAQ();
	},[]);

	useEffect(() => {
		fetchFAQ();
	},[page]);

	const fetchFAQ = () => {
		axios.post(`${SERVER_URL}/faq/list`, {
			page : page
		}).then((res) => {
			if (!res.data || !res.data.faq_lists)
				return;
			setFAQList(res.data.faq_lists);
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

	const addFAQ = () => {
		axios.post(`${SERVER_URL}/faq/add`, {
			"faq_title" : title,//string,
			"faq_contents" : contents,//string
		}, {
			headers: {
				TOKEN : AUTH_TOKEN
			}
		}).then((res) => {
			alert("FAQ가 정상적으로 추가되었습니다.");
			fetchFAQ();
			setOpenModal(false);
		})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<>
			<PageTitle
				title="FAQ"
				isButtonVisible={false}
			/>
			<div className="faq-wrap">
				<div className="add-con">
					<Button variant="outlined" color="primary" onClick={handleOpenModal}>FAQ 추가</Button>
				</div>
				<div className="faq-con">
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className="table-title">작성자</TableCell>
								<TableCell className="table-title">FAQ 제목</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								FAQList &&
								FAQList.map((faq) => (
									<TableRow key={faq.faq_id} onClick={() => history.push(`/admin/faq/${faq.faq_id}`)}>
										<TableCell className="table-content">{faq.admi_name}</TableCell>
										<TableCell className="table-content-title">{faq.faq_title}</TableCell>
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
				title="FAQ 추가"
				button="추가"
				buttonOnClick={addFAQ}
			>
				<div className="faq-modal">
					<TextField
						className="faq-input"
						label="제목"
						placeholder="제목"
						InputLabelProps={{shrink:true}}
						inputProps={{ maxLength: 50 }}
						variant="outlined"
						value={title}
						onChange={(e: any) => setTitle(e.target.value)}
					/>
					<TextField
						className="faq-input"
						label="내용"
						placeholder="내용"
						InputLabelProps={{shrink:true}}
						variant="outlined"
						inputProps={{ maxLength: 600 }}
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

export default AdminFAQ;