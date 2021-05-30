import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PageTitle } from '../../Components';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField } from '@material-ui/core';
import { useHallListState } from '../../Main/HallListModel';
import { HallType, HallNameListType } from '../../Main/Type';
import "../../scss/pages/adminhall.scss";

const AdminHall = () => {
	const hallList = useHallListState();
	const history = useHistory();

	const [openSeatModal, setOpenSeatModal] = useState<boolean>(false);
	const [hallNameList, setHallNameList] = useState<HallNameListType>({});

	useEffect(()=>{
		//hallList 바뀔 때마다 hallNameList 변경
		if(!hallList || !hallList.data)
			return;
		const obj : HallNameListType = {};
		hallList.data.forEach((hall) => {
			obj[hall.hall_id] = hall.hall_name;
		});
		setHallNameList(obj);
	},[hallList]);

	const handleSeatModal = () => {

	}

	const handleNameChange = (e : any, id : number) => {
		const obj = Object.assign({}, hallNameList);
		obj[id] = e.target.value;
		setHallNameList(obj);
	}

	const SaveHallName = () => {
		// 상영관 이름 저장
		
	}

	return (
		<div>
			<PageTitle title="상영관 리스트 페이지" isButtonVisible={true}/>
			<div className="hall-list-con">
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>번호</TableCell>
								<TableCell>상영관 이름</TableCell>
								<TableCell>상영관 이름 수정</TableCell>
								<TableCell>좌석 수정</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								hallList && hallList.data &&
								hallList.data.map((hall : HallType, index : number) => (
									<TableRow key={hall.hall_id}>
										<TableCell>{index + 1}</TableCell>
										<TableCell><TextField value={hallNameList[hall.hall_id]} onChange={(e : any) => handleNameChange(e, hall.hall_id)}/></TableCell>
										<TableCell><Button variant="contained" color="primary" onClick={SaveHallName}>상영관 이름 수정</Button></TableCell>
										<TableCell><Button variant="contained" color="primary" onClick={handleSeatModal}>좌석 수정</Button></TableCell>
									</TableRow>
								))
							}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
}

export default AdminHall;