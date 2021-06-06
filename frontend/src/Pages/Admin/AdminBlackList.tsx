import React, { useEffect, useState } from 'react';
import { ModalComponent, PageTitle, SelectModule } from '../../Components';
import { BlackList } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';


const AdminBlackList = () => {
	const AUTH_TOKEN = useTokenState();

	/* 조회 */
	const [blackList, setBlackList] = useState<BlackList[]|undefined>(undefined);

	useEffect(() => {
		fetchBlackList();
	}, [])

	const fetchBlackList = ()=> {
		axios.get(`${SERVER_URL}/blacklist`,{
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data)
					return;
				setBlackList(res.data);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	/* 수정 */
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	const [birthYear, setBirthYear] = useState<string>("");
	const [birthMonth, setBirthMonth] = useState<string>("");
	const [birthDate, setBirthDate] = useState<string>("");
	const [birth, setBirth] = useState<string>("");
	const [phoneNum, setPhoneNum] = useState<string>("");

	useEffect(() => {
		const month = birthMonth.length === 1? "0"+birthMonth : birthMonth;
		const date = birthDate.length ===1? "0"+birthDate :birthDate;
		setBirth(`${birthYear}${month}${date}`);
	}, [birthYear, birthMonth, birthDate]);

	const handleModify = (people : BlackList) => {
		console.log(people);
		setName(people.blac_name);
		setBirthYear(people.birth.substr(0, 4));
		setBirthMonth(Number(people.birth.substr(4, 2)).toString());
		setBirthDate(Number(people.birth.substr(6, 2)).toString());
		setPhoneNum(people.phone_num);
		setOpenModal(true);
	}

	const modifyBlackList = () => {
		// todo : api 수정 후 하기
		// axios.put(`${SERVER_URL}/blacklist`,{
		// 	"blac_name" : name,
		// 	"birth" : birth,//"19880808",
		// 	"phone_num" : phoneNum,//"01088888889"
		// },{
		// 	headers: {
		// 		TOKEN: AUTH_TOKEN
		// 	}
		// })
		// 	.then((res) => {
		// 		alert("블랙리스트가 성공적으로 수정되었습니다.");
		// 		setOpenModal(false);
		// 		fetchBlackList();
		// 	})
		// 	.catch((e) => {
		// 		errorHandler(e, true);
		// 	});
	}

	/* 삭제 */
	const removeBlackList = (phone_num : string) => {
		if(!confirm("해당 블랙리스트를 정말로 삭제하시겠습니까?"))
			return;
		axios.delete(`${SERVER_URL}/blacklist/delete/${phone_num}`,{
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("블랙리스트가 성공적으로 삭제되었습니다.");
				fetchBlackList();
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	/* 추가 */
	const [openAddModal, setOpenAddModal] = useState<boolean>(false);
	const [addName, setAddName] = useState<string>("");
	const [addBirthYear, setAddBirthYear] = useState<string>("");
	const [addBirthMonth, setAddBirthMonth] = useState<string>("");
	const [addBirthDate, setAddBirthDate] = useState<string>("");
	const [addBirth, setAddBirth] = useState<string>("");
	const [addPhoneNum, setAddPhoneNum] = useState<string>("");

	useEffect(() => {
		const month = addBirthMonth.length === 1? "0"+addBirthMonth : addBirthMonth;
		const date = addBirthDate.length ===1? "0"+addBirthDate :addBirthDate;
		setAddBirth(`${addBirthYear}${month}${date}`);
	}, [addBirthYear, addBirthMonth, addBirthDate]);

	const addBlackList = () => {
		axios.post(`${SERVER_URL}/blacklist`,{
			"blac_name" : addName,
			"birth" : addBirth,
			"phone_num" : addPhoneNum
		}, {
			headers: {
				TOKEN: AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("블랙리스트가 성공적으로 추가되었습니다.");
				setOpenAddModal(false);
				fetchBlackList();
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<div>
			<PageTitle
				title="블랙리스트"
				isButtonVisible={false}
			/>
			<div>
				<Button variant="contained" color="primary" onClick={() => setOpenAddModal(true)}>블랙리스트 추가</Button>
			</div>
			<div>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>이름</TableCell>
								<TableCell>생년월일</TableCell>
								<TableCell>핸드폰번호</TableCell>
								<TableCell>수정</TableCell>
								<TableCell>삭제</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								blackList &&
								blackList.map((people) => (
									<TableRow key={people.phone_num}>
										<TableCell>{people.blac_name}</TableCell>
										<TableCell>{people.birth}</TableCell>
										<TableCell>{people.phone_num}</TableCell>
										<TableCell><Button variant="contained" color="primary" onClick={()=>handleModify(people)}>수정</Button></TableCell>
										<TableCell><Button variant="contained" color="secondary" onClick={() => removeBlackList(people.phone_num)}>삭제</Button></TableCell>
									</TableRow>
								))
							}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			<ModalComponent
				open={openModal}
				setOpen={setOpenModal}
				title="블랙리스트 수정"
				button="수정"
				buttonOnClick={modifyBlackList}
			>
				<div>
					<TextField label="이름" value={name} onChange={(e: any) => setName(e.target.value)}/>
					<div className="birth-con">
						<SelectModule tag="Year" value={birthYear} handleValueChange={(e: any) => { setBirthYear(e.target.value) }} start={1930} end={2022} />
						<SelectModule tag="Month" value={birthMonth} handleValueChange={(e: any) => { setBirthMonth(e.target.value) }} start={1} end={12} />
						<SelectModule tag="Date" value={birthDate} handleValueChange={(e: any) => { setBirthDate(e.target.value) }} start={1} end={30} />
					</div>
					<TextField label="핸드폰 번호" value={phoneNum} disabled={true}/>
				</div>
			</ModalComponent>
			<ModalComponent
				open={openAddModal}
				setOpen={setOpenModal}
				title="블랙리스트 추가"
				button="추가"
				buttonOnClick={addBlackList}
			>
				<div>
					<TextField label="이름" value={addName} onChange={(e: any) => setAddName(e.target.value)}/>
					<div className="birth-con">
						<SelectModule tag="Year" value={addBirthYear} handleValueChange={(e: any) => { setAddBirthYear(e.target.value) }} start={1930} end={2022} />
						<SelectModule tag="Month" value={addBirthMonth} handleValueChange={(e: any) => { setAddBirthMonth(e.target.value) }} start={1} end={12} />
						<SelectModule tag="Date" value={addBirthDate} handleValueChange={(e: any) => { setAddBirthDate(e.target.value) }} start={1} end={30} />
					</div>
					<TextField label="핸드폰 번호" value={addPhoneNum} inputProps={{maxLength: 11}} onChange={(e: any) => setAddPhoneNum(e.target.value)}/>
				</div>
			</ModalComponent>
		</div>
	);
}

export default AdminBlackList;