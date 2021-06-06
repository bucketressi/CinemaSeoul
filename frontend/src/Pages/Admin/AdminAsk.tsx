import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../Components';
import { MypageAskExactType, MypageAskType } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';
import { Button, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { ModalComponent } from '../../Components';

const AdminAsk = () => {
	const AUTH_TOKEN = useTokenState();

	const [page, setPage] = useState<number>(1);
	const [totalPage, setTotalPage] = useState<number>(1);
	const [answered, setAnswered] = useState<number>(0); //답변 여부 0 : ALL, 1 : 답변 X  2 : 답변 O

	const [askList, setAskList] = useState<MypageAskType[] | undefined>(undefined);

	/* 답변하기 */
	const [openExactModal, setOpenExactModal] = useState<boolean>(false);
	const [selectedAsk, setSelectedAsk] = useState<MypageAskExactType | undefined>(undefined);
	const [answer, setAnswer] = useState<string>("");

	useEffect(() => {
		fetchAskList();
	}, []);

	useEffect(() => {
		fetchAskList();
	}, [answered]);

	const fetchAskList = () => {
		axios.post(`${SERVER_URL}/ask/list`, {
			"page": page ? page : 1,
			"user_id": null,
			"answered": answered
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data || !res.data.ask_lists)
					return;
				setAskList(res.data.ask_lists);
				setTotalPage(res.data.totalpage);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const handlePageChange = (e: any, pageNumber: number) => { setPage(pageNumber); };
	const fetchExactAsk = (ask_id: number) => {
		axios.get(`${SERVER_URL}/ask/${ask_id}`, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data)
					return;
				setSelectedAsk(res.data);
				setAnswer(res.data.answer);
				setOpenExactModal(true);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	/* 답변 */
	const saveAskAnswer = () => {
		if(!selectedAsk)
			return;
		axios.post(`${SERVER_URL}/ask/answer`, {
			"ask_id": selectedAsk.ask_id,
			"answer": answer
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				setOpenExactModal(false);
				fetchAskList();
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	/* 삭제 */
	const removeAsk = (ask_id : number) => {
		if(!confirm("해당 문의를 정말로 삭제하시겠습니까?"))
			return;
		axios.delete(`${SERVER_URL}/ask/delete/${ask_id}`, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("문의가 성공적으로 삭제되었습니다.");
				fetchAskList();
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<div className="admin-ask-con">
			<PageTitle
				title="1:1 문의 리스트"
				isButtonVisible={false}
			/>
			<div>
				<Tabs
					value={answered}
					onChange={(e: any, newValue: number) => setAnswered(newValue)}
					className="mypage-tab"
					indicatorColor="primary"
				>
					<Tab label="ALL" />
					<Tab label="답변있는 문의" />
					<Tab label="답변없는 문의" />
				</Tabs>
			</div>
			<div
				role="tabpanel"
			>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>작성일자</TableCell>
								<TableCell>제목</TableCell>
								<TableCell>답변 여부 </TableCell>
								<TableCell>문의삭제</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								askList &&
								askList.map((ask) => (
									<TableRow key={ask.ask_id}>
										<TableCell>작성일자 : {ask.crea_datetime}</TableCell>
										<TableCell>제목 : {ask.ask_title}</TableCell>
										<TableCell>답변 여부 : {
											ask.admi_name && ask.answ_datetime ?
												<Button variant="contained" color="default" onClick={() => fetchExactAsk(ask.ask_id)}>답변 수정하기</Button>
												: <Button variant="contained" color="primary" onClick={() => fetchExactAsk(ask.ask_id)}>답변 달기</Button>
										}</TableCell>
										<TableCell>
											<Button variant="contained" color="secondary" onClick={() => removeAsk(ask.ask_id)}>삭제하기</Button>
										</TableCell>
									</TableRow>
								))
							}
						</TableBody>
					</Table>
				</TableContainer>
				<Pagination className="pagination" count={totalPage} page={page} onChange={handlePageChange} />
			</div>
			{
				selectedAsk &&
				<ModalComponent
					open={openExactModal}
					setOpen={setOpenExactModal}
					title="자세한 문의 내역"
					button="답변 완료"
					buttonOnClick={saveAskAnswer}
				>
					<div>
						<div>작성자 {selectedAsk.user_name}</div>
						<div>제목 {selectedAsk.ask_title}</div>
						<div>내용 {selectedAsk.ask_contents}</div>
						<div>문의 일자 {selectedAsk.crea_datetime}</div>
						<TextField value={answer} onChange={(e: any) => setAnswer(e.target.value)} label="답변" multiline={true} />
					</div>
				</ModalComponent>
			}
		</div>
	)
}

export default AdminAsk;