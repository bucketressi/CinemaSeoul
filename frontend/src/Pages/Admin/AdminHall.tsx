import React, { DOMElement, ReactElement, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { ModalComponent, PageTitle } from '../../Components';
import { FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField } from '@material-ui/core';
import { useHallListState, usefetchHallFunction } from '../../Main/HallListModel';
import { HallType, HallListType, SeatObjType, SeatAPIType, SeatType } from '../../Main/Type';
import "../../scss/pages/adminhall.scss";

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';

const AdminHall = () => {
	const AUTH_TOKEN = useTokenState
	const fetchHall = usefetchHallFunction();
	const hallList = useHallListState();
	const history = useHistory();
	const [seatTypeMap, setSeatTypeMap] = useState<Map<string,string>>(new Map());
	const [halls, setHalls] = useState<HallListType>({}); 

	const [openSeatModal, setOpenSeatModal] = useState<boolean>(false);

	const [modalID, setModalID] = useState<number>(-1);
	const [modalHall, setModalHall] = useState<HallType | undefined>(undefined);
	const [modalSeat, setModalSeat] = useState<SeatObjType | undefined>(undefined);

	const [selectedSeat, setSelectedSeat] = useState<number>(-1);
	const [seatType, setSeatType] = useState<string>("default");
	const [openSeatTypeModal, setOpenSeatTypeModal] = useState<boolean>(false);


	useEffect(() => {
		fetchHall();
	}, []);

	useEffect(() => {
		if(!hallList)
			return;
		setHalls(hallList);
	}, [hallList]);

	useEffect(() => {
		// modal에 띄울 hall이 바뀔 떄마다 좌석 정보도 변경
		if (modalID == -1 || !hallList || hallList[modalID] == undefined)
			return;
		setModalHall(hallList[modalID]);

		axios.post(`${SERVER_URL}/hall/${modalID}`, { // seat 받아오기
			headers : {
				TOKEN : AUTH_TOKEN
			}
		})
			.then((res) => {
				if(!res.data?.seats)
					return;
				res.data.seats.forEach((seat : SeatType) => {
					console.log(seat);
				});
			})
			.catch((e) => {
				errorHandler(e, true, ["", "", "", ""]);
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
		const obj = Object.assign({}, halls);
		obj[id].hall_name = e.target.value;
		setHalls(obj);
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

	const handleSeatModal = (id: number) => {
		// 해당 id의 상영관 띄우기
		setOpenSeatModal(true);
		setModalID(id);
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
			const seat_num = modalSeat[idx + i]?.seat_num;
			const type_code = modalSeat[idx + i]?.seat_type_code;
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
		for (let i = 0; i < Object.keys(modalSeat).length; i++) {
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
								hallList &&
								Object.keys(hallList).map((hall_id: string, index: number) => {
									const hall = hallList[Number(hall_id)];
									if(hall === undefined)
										return null;
									return (
										<TableRow key={hall_id}>
											<TableCell>{index + 1}</TableCell>
											<TableCell>
												<TextField className="hall-name" value={hall.hall_name} onChange={(e: any) => handleNameChange(e, hall.hall_id)} />
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
									);
								})
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