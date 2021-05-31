import React, { DOMElement, ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ModalComponent, PageTitle } from '../../Components';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField } from '@material-ui/core';
import { useHallListState } from '../../Main/HallListModel';
import { HallType, HallListObjType, HallSeatObjType, SimpleHallType, SeatType } from '../../Main/Type';
import "../../scss/pages/adminhall.scss";

const AdminHall = () => {
	const hallList = useHallListState();
	const history = useHistory();

	const [openSeatModal, setOpenSeatModal] = useState<boolean>(false);
	const [hallObjList, setHallObjList] = useState<HallListObjType>({}); // 이름 변경 시 사용
	
	const [modalID, setModalID] = useState<number>(-1);
	const [modalHall, setModalHall] = useState<SimpleHallType | undefined>(undefined);
	const [modalSeat, setModalSeat] = useState<HallSeatObjType | undefined>(undefined);

	useEffect(() => {
		//hallList 바뀔 때마다 hallObjList 변경
		if (!hallList || !hallList.data)
			return;
		const obj: HallListObjType = {};
		hallList.data.forEach((hall) => {
			obj[hall.hall_id] = {
				hall_row: hall.hall_row,
				hall_col: hall.hall_col,
				hall_name: hall.hall_name
			}
		});
		setHallObjList(obj);
	}, [hallList]);

	useEffect(() => {
		// modal에 띄울 hall이 바뀔 떄마다 좌석 정보도 변경
		if(modalID == -1 || hallObjList[modalID]== undefined)
			return;
		setModalHall(hallObjList[modalID]);
		// seat 받아오기 => api 호출
		setModalSeat({ //dummy
			seats : [{
				hall_id: 42,
				seat_num: 0,
				seat_type_code: "230001"
			}, {
				hall_id: 42,
				seat_num: 1,
				seat_type_code: "230001"
			}, {
				hall_id: 42,
				seat_num: 2,
				seat_type_code: "230001"
			}]
		});
	}, [modalID])

	const handleNameChange = (e: any, id: number) => {
		const obj = Object.assign({}, hallObjList);
		obj[id].hall_name = e.target.value;
		setHallObjList(obj);
	}

	const handleSeatModal = (id: number) => {
		// 해당 id의 상영관 띄우기
		setOpenSeatModal(true);
		setModalID(id);
	}

	const saveHallName = (id: number) => {
		// 해당 id의 상영관 이름 저장
		// hallobjlist의 id에 해당하는 name 갱신 api 호출
	}

	const removeHall = () => {
		// 상영관 삭제 
	}

	const saveSeat = (id: number) => {
		// 해당 id의 상영관 좌석 저장
	}

	const getColArray = (col : number) => {
		const arr = [];
		for(let i=1; i<=col; i++){
			arr.push(i);
		}
		return arr;
	}

	const getSeatArray = (idx: number, col : number) => { // idx부터 col개의 행 return
		const DOM = [];
		for(let i=0; i<col; i++){
			DOM.push(<td className="seat" key={idx+i}><div>{idx + i}</div></td>);
		}

		return (
			<TableRow key={idx}>
				{DOM}
			</TableRow>
		)
	}

	const getSeatElement = (col : number) => {
		if(!modalSeat)
			return;

		const DOM = [];
		for(let i=0; i<modalSeat.seats.length; i++){
			if(i%col === 0){
				DOM.push(getSeatArray(i, col));
			}
		}
		return DOM;
	}

	return (
		<div>
			<PageTitle title="상영관 리스트 페이지" isButtonVisible={true} />
			<div className="hall-list-con">
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>번호</TableCell>
								<TableCell>상영관 이름</TableCell>
								<TableCell>상영관 행, 열</TableCell>
								<TableCell>수정</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								hallList && hallList.data &&
								hallList.data.map((hall: HallType, index: number) => (
									hallObjList[hall.hall_id] &&
									<TableRow key={hall.hall_id}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>
											<TextField className="hall-name" value={hallObjList[hall.hall_id].hall_name} onChange={(e: any) => handleNameChange(e, hall.hall_id)} />
											<Button variant="contained" color="primary" onClick={() => saveHallName(hall.hall_id)}>상영관 이름 수정</Button>
										</TableCell>
										<TableCell className="row-col-con">
											<span>{`${hall.hall_row}행`}</span>
											<span>{`${hall.hall_col}열`}</span>
										</TableCell>
										<TableCell>
											<Button variant="contained" color="primary" onClick={() => handleSeatModal(hall.hall_id)}>좌석 수정</Button>
											<Button variant="contained" color="primary" onClick={removeHall}>상영관 삭제</Button>
										</TableCell>
									</TableRow>
								))
							}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			{
				modalHall &&
				<ModalComponent
					open={openSeatModal}
					setOpen={setOpenSeatModal}
					title="상영관 좌석 수정"
					button="저장"
					buttonOnClick={() => saveSeat(modalID)}
				>
					<div className="seat-map">
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										{
											getColArray(modalHall.hall_col).map((index : number) => (
												<TableCell key={index}>{index}</TableCell>
											))
										}
									</TableRow>
								</TableHead>
								<TableBody>
									{
										getSeatElement(modalHall.hall_col)
									}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</ModalComponent>
			}
		</div>
	);
}

export default AdminHall;