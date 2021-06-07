import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../Components';
import { FAQComponentType } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Pagination } from '@material-ui/lab';

const FAQ = () => {
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


	return (
		<div>
			<PageTitle
				title="FAQ"
				isButtonVisible={false}
			/>
			<div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>작성자</TableCell>
							<TableCell>FAQ 제목</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							FAQList &&
							FAQList.map((faq) => (
								<TableRow key={faq.faq_id} onClick={() => history.push(`/faq/${faq.faq_id}`)}>
									<TableCell>{faq.admi_name}</TableCell>
									<TableCell>{faq.faq_title}</TableCell>
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

export default FAQ;