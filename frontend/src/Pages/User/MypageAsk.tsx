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

	/* 수정하기 */
	const [openModifyModal, setOpenModifyModal] = useState<boolean>(false);
	const [modifyTitle, setModifyTitle] = useState<string>("");
	const [modifyContents, setModifyContents] = useState<string>("");

	useEffect(() => {
		if (mode !== 3)
			return;
		fetchAskList();
	}, [mode, answered]);

	useEffect(() => {
		if(!selectedAsk)
			return;
		setModifyTitle(selectedAsk.ask_title);
		setModifyContents(selectedAsk.ask_contents);
	},[selectedAsk]);

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

	/* 추가 */
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
				alert("문의가 정상적으로 추가되었습니다.");
				setOpenAskModal(false);
				fetchAskList();
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}
	
	/* 수정, 조회 */
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
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const handleOpenExact = (ask_id : number) => {
		fetchExactAsk(ask_id);
		setOpenExactModal(true);
	}

	const handleOpenModify = (ask_id : number) => {
		fetchExactAsk(ask_id);
		setOpenModifyModal(true);
	}
	
	const updateAsk = () => {
		if(!selectedAsk)
			return;
		axios.put(`${SERVER_URL}/ask/update`,{
			"ask_id" : selectedAsk.ask_id,
			"ask_title" : modifyTitle,
			"ask_contents" : modifyContents
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("문의가 정상적으로 수정되었습니다.");
				fetchAskList();
				setOpenModifyModal(false);
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
				alert("문의가 정상적으로 삭제되었습니다.");
				fetchAskList();
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<div className="mypage-ask-con">
			<Tabs
				value={answered}
				onChange={(e: any, newValue: number) => setAnswered(newValue)}
				className="mypage-tab"
				indicatorColor="primary"
			>
				<Tab label="ALL" />
				<Tab label="답변없는 문의" />
				<Tab label="답변있는 문의" />
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
								<TableCell>문의 삭제</TableCell>
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
												<Button variant="contained" color="primary" onClick={() => handleOpenExact(ask.ask_id)}>답변 보기</Button>
												: <Button variant="contained" color="default" onClick={() => handleOpenModify(ask.ask_id)}>수정 하기</Button>
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
			<ModalComponent
				open={openAskModal}
				setOpen={setOpenAskModal}
				title="문의 작성하기"
				button="완료"
				buttonOnClick={addAsk}
			>
				<div className="modal-column-con">
					<TextField value={title} onChange={(e: any) => setTitle(e.target.value)} label="문의 제목" />
					<TextField variant="outlined" value={contents} onChange={(e: any) => setContents(e.target.value)} label="문의 내용" multiline={true} />
				</div>
			</ModalComponent>
			{
				selectedAsk &&
				<ModalComponent
					open={openExactModal}
					setOpen={setOpenExactModal}
					title="자세한 문의 내역"
				>
					<div className="modal-column-con exact-ask">
						<div><span>제목</span><p>{selectedAsk.ask_title}</p></div>
						<div><span>내용</span><p> {selectedAsk.ask_contents}</p></div>
						<div><span>관리자</span> <p>{selectedAsk.admi_name}</p></div>
						<div><span>답변</span><p> {selectedAsk.answer}</p></div>
						<div><span>문의 일자</span> <p>{selectedAsk.crea_datetime}</p></div>
						<div><span>답변 일자</span><p>{selectedAsk.answ_datetime}</p></div>
					</div>
				</ModalComponent>
			}
			{
				selectedAsk &&
				<ModalComponent
					open={openModifyModal}
					setOpen={setOpenModifyModal}
					title="문의 내역 수정"
					button="수정"
					buttonOnClick={updateAsk}
				>
					<div className="modal-column-con">
						<TextField value={modifyTitle} label="제목" onChange={(e: any) => setModifyTitle(e.target.value)}/>
						<TextField className="contents" variant="outlined" value={modifyContents} label="내용" onChange={(e: any) => setModifyContents(e.target.value)} multiline={true}/>
					</div>
				</ModalComponent>
			}
		</div>
	);
}

export default MypageAsk;