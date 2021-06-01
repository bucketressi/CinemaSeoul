import React, { DOMElement, ReactElement, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { ModalComponent, PageTitle } from '../../Components';
import { FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField } from '@material-ui/core';
import { useHallListState } from '../../Main/HallListModel';
import { HallType, HallListObjType, HallSeatObjType, SimpleHallType, SeatType } from '../../Main/Type';
import "../../scss/pages/adminhall.scss";

const AdminHall = () => {
	const hallList = useHallListState();
	const history = useHistory();
	const [seatTypeMap, setSeatTypeMap] = useState<Map<string,string>>(new Map());

	const [openSeatModal, setOpenSeatModal] = useState<boolean>(false);
	const [hallObjList, setHallObjList] = useState<HallListObjType>({}); // 이름 변경 시 사용

	const [modalID, setModalID] = useState<number>(-1);
	const [modalHall, setModalHall] = useState<SimpleHallType | undefined>(undefined);
	const [modalSeat, setModalSeat] = useState<HallSeatObjType | undefined>(undefined);

	const [selectedSeat, setSelectedSeat] = useState<number>(-1);
	const [seatType, setSeatType] = useState<string>("default");
	const [openSeatTypeModal, setOpenSeatTypeModal] = useState<boolean>(false);

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
		if (modalID == -1 || hallObjList[modalID] == undefined)
			return;
		setModalHall(hallObjList[modalID]);
		// seat 받아오기 => api 호출
		setModalSeat({ //dummy
			seats: [{
				hall_id: 42,
				seat_num: 0,
				seat_type_code: "230001"
			}, {
				hall_id: 43,
				seat_num: 1,
				seat_type_code: "230002"
			}, {
				hall_id: 44,
				seat_num: 2,
				seat_type_code: "230003"
			}, {
				hall_id: 45,
				seat_num: 3,
				seat_type_code: "230004"
			}, {
				hall_id: 46,
				seat_num: 4,
				seat_type_code: "230002"
			}, {
				hall_id: 47,
				seat_num: 5,
				seat_type_code: "230001"
			}]
		});
	}, [modalID]);

	useEffect(() => {
		const map = new Map();
		map.set("230001", "default");
		map.set("230002", "diabled");
		map.set("230003", "impossible");
		map.set("230004", "distance");
		setSeatTypeMap(map);
	}, []);

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
		// todo : 해당 id의 상영관 이름 저장
		// hallobjlist의 id에 해당하는 name 갱신 api 호출
	}

	const removeHall = () => {
		// todo : 상영관 삭제 
	}

	const saveSeat = () => {
		// todo : modalID의 상영관 좌석 저장
		setOpenSeatModal(false);
	}

	const getColArray = (col: number) => {
		const arr = [];
		for (let i = 1; i <= col; i++) {
			arr.push(i);
		}
		return arr;
	}

	const getSeatArray = (idx: number, col: number) => { // idx부터 col개의 행 return
		if (!modalSeat || !modalHall)
			return;

		const DOM = [];
		for (let i = 0; i < col+1; i++) {
			const seat_num = modalSeat.seats[idx + i]?.seat_num;
			const type_code = modalSeat.seats[idx + i]?.seat_type_code;
			if(idx+i > modalHall.hall_row * modalHall.hall_col) // 존재해야할 좌석보다 많으면 없애기
				break;
			if(seat_num && type_code)
				DOM.push(<td className={clsx("seat", seatTypeMap.get(type_code))} key={seat_num}><div className={`${seat_num}`}>{seat_num}</div></td>);
		}

		return (
			<TableRow key={idx}>
				{DOM}
			</TableRow>
		)
	}

	const getSeatElement = (col: number) => { // 전체 좌석 return
		if (!modalSeat)
			return;

		const DOM = [];
		for (let i = 0; i < modalSeat.seats.length; i++) {
			if (i % (col+1) === 0) {
				DOM.push(getSeatArray(i, col));
			}
		}
		return DOM;
	}

	const handleSelectSeat = (e : any) => { // 좌석 클릭 시 정보 저장하고 모달 띄우기
		let seat = e.target;
		if(seat.tagName == "TD")
			seat = e.target.children[0];
		
		const seat_num = seat.className;
		const seat_type = seat.parentNode.classList[1];
		setOpenSeatTypeModal(true);
		setSelectedSeat(seat_num);
		setSeatType(seat_type);
	}

	const handleSeatTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => { // modal에 있는 seat의 type 변경
		const code = event.target.value as string;
		setSeatType(code);
	}

	const getSeatTypeSelect = () => {
		const DOM = [];
		for(const [code, codeString] of Array.from(seatTypeMap)){
			DOM.push(<MenuItem value={code}>{codeString}</MenuItem>)
		}

		return DOM;
	}

	const saveSeatType = () => {  // todo : api 호출해서 좌석 타입 저장
		setOpenSeatTypeModal(false);
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
					buttonOnClick={() => saveSeat()}
				>
					<div className="seat-map">
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										{
											getColArray(modalHall.hall_col).map((index: number) => (
												<TableCell key={index}>{index}</TableCell>
											))
										}
									</TableRow>
								</TableHead>
								<TableBody onClick={handleSelectSeat}>
									{
										getSeatElement(modalHall.hall_col)
									}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</ModalComponent>
			}
			{
				selectedSeat !== -1 &&
				<ModalComponent
					open={openSeatTypeModal}
					setOpen={setOpenSeatTypeModal}
					title="좌석 정보 수정"
					button="저장"
					buttonOnClick={() => saveSeatType()}
				>
					<FormControl>
						<InputLabel id="select-label">좌석 종류</InputLabel>
						<Select
							labelId="select-label"
							value={seatType}
							onChange={handleSeatTypeChange}
						>
							{
								getSeatTypeSelect()
							}
						</Select>
					</FormControl>
				</ModalComponent>
			}
		</div>
	);
}

export default AdminHall;