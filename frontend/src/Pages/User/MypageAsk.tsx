import React, { useEffect, useState } from 'react';
import { MypageAskExactType, MypageAskType } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';
import { useUserState } from '../../Main/UserModel';
import { Button, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { ModalComponent } from '../../Components';

type Props = {
	mode: number
}

const MypageAsk = ({ mode }: Props) => {
	const userId = useUserState();
	const AUTH_TOKEN = useTokenState();
	const [page, setPage] = useState<number>(1);
	const [totalPage, setTotalPage] = useState<number>(1);
	const [answered, setAnswered] = useState<number>(0); //답변 여부 0 : ALL, 1 : 답변 X  2 : 답변 O
	const [askList, setAskList] = useState<MypageAskType[] | undefined>(undefined);

	/* 문의하기 */
	const [openAskModal, setOpenAskModal] = useState<boolean>(false);
	const [title, setTitle] = useState<string>("");
	const [contents, setContents] = useState<string>("");

	/* 자세히 보기 */
	const [openExactModal, setOpenExactModal] = useState<boolean>(false);
	const [selectedAsk, setSelectedAsk] = useState<MypageAskExactType | undefined>(undefined);

	useEffect(() => {
		if (mode !== 3)
			return;
		fetchAskList();
	}, [mode, answered]);

	const fetchAskList = () => {
		if (!userId)
			return;

		axios.post(`${SERVER_URL}/ask/list`, {
			"page": page ? page : 1,
			"user_id": userId,
			"answered": answered
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data || !res.data.ask_lists )
					return;
				setAskList(res.data.ask_lists);
				setTotalPage(res.data.totalpage);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const handlePageChange = (e: any, pageNumber: number) => { setPage(pageNumber); };
	const addAsk = () => {
		axios.post(`${SERVER_URL}/ask/add`, {
			"ask_title": title,
			"ask_contents": contents
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("문의가 등록되었습니다.")
				setOpenAskModal(false);
				fetchAskList();
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}
	
	const fetchExactAsk = (ask_id: number) => {
		axios.get(`${SERVER_URL}/ask/${ask_id}`, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				if(!res.data)
					return;
				setSelectedAsk(res.data);
				setOpenExactModal(true);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
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
			<Button variant="outlined" color="primary" onClick={() => setOpenAskModal(true)}>문의하기</Button>
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
												<Button variant="contained" color="primary" onClick={() => fetchExactAsk(ask.ask_id)}>답변 보기</Button>
												: <Button variant="contained" color="default" onClick={() => fetchExactAsk(ask.ask_id)}>자세히 보기</Button>
										}</TableCell>

									</TableRow>
								))
							}
						</TableBody>
					</Table>
				</TableContainer>
				<Pagination className="pagination" count={totalPage} page={page} onChange={handlePageChange} />
			</div>
			<ModalComponent
				open={openAskModal}
				setOpen={setOpenAskModal}
				title="문의 작성하기"
				button="완료"
				buttonOnClick={addAsk}
			>
				<div>
					<TextField value={title} onChange={(e: any) => setTitle(e.target.value)} label="문의 제목" />
					<TextField value={contents} onChange={(e: any) => setContents(e.target.value)} label="문의 내용" multiline={true} />
				</div>
			</ModalComponent>
			{
				selectedAsk &&
				<ModalComponent
					open={openExactModal}
					setOpen={setOpenExactModal}
					title="자세한 문의 내역"
				>
					<div>
						<div>제목 {selectedAsk.ask_title}</div>
						<div>내용 {selectedAsk.ask_contents}</div>
						<div>관리자 {selectedAsk.admi_name}</div>
						<div>답변 {selectedAsk.answer}</div>
						<div>문의 일자 {selectedAsk.crea_datetime}</div>
						<div>답변 일자 {selectedAsk.answ_datetime}</div>
					</div>
				</ModalComponent>
			}
		</div>
	);
}

export default MypageAsk;