import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../Components';
import { useHistory } from 'react-router-dom';
import { ListItem, ListItemText, Switch, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { ShowScheduleType } from '../../Main/Type';
import { useShowScheduleListState } from '../../Main/ShowScheduleModel';
import { ModalComponent } from '../../Components';
import "../../scss/pages/adminshowschedule.scss";

const AdminShowSchedule = () => {
	const history = useHistory();
	const showScheduleList = useShowScheduleListState();
	const [scheduleList, setScheduleList] = useState<ShowScheduleType[]>([]);
	const [mode, setMode] = useState<boolean>(true);

	useEffect(() => {
		if (showScheduleList?.showschedule_list == undefined)
			return;
		setScheduleList(showScheduleList.showschedule_list);
	}, [showScheduleList]);

	const gotoScheduleExact = (id: number) => {
		history.push(`/admin/showschedule/${id}`);
	}

	const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.checked);
		setMode(event.target.checked);
	}

	/* 상영일정 추가 */
	const [openModal, setOpenModal] = useState<boolean>(false);

	const addShowSchedule = () => {
		console.log("상영일정 추가");
	}


	return (
		<div>
			<PageTitle title="상영일정 페이지" isButtonVisible={true} />
			<div className="schedule-con">
				<div className="schedule-header">
					<div className="switch-con">
						<div>{mode ? "표" : "리스트"}</div>
						<Switch
							checked={mode}
							onChange={handleModeChange}
							color="primary"
							name={mode ? "표" : "리스트"}
						/>
					</div>
					<div className="save-btn">
						<Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>추가</Button>
					</div>
				</div>
				{
					mode ?
						<div>표</div>
						:
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>번호</TableCell>
										<TableCell>상영관</TableCell>
										<TableCell>영화</TableCell>
										<TableCell>개봉일자</TableCell>
										<TableCell>런타임</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										scheduleList.map((schedule : ShowScheduleType, index : number) => (
											<TableRow key={schedule.show_id} onClick={() => gotoScheduleExact(schedule.show_id)}>
												<TableCell>{index + 1}</TableCell>
												<TableCell>{schedule.hall_name}</TableCell>
												<TableCell>{schedule.movi_name}</TableCell>
												<TableCell>{`${schedule.show_date.substr(0, 4)}/${schedule.show_date.substr(4, 2)}/${schedule.show_date.substr(6, 2)}`}</TableCell>
												<TableCell>{`${schedule.show_time.substr(0, 2)}시간 ${schedule.show_time.substr(2, 2)}분`}</TableCell>
											</TableRow>
										))
									}
								</TableBody>
							</Table>
						</TableContainer>
				}
			</div>
			<ModalComponent
				open={openModal}
				setOpen={setOpenModal}
				title="상영일정 추가"
				button="추가"
				buttonOnClick={addShowSchedule}
			>
				<div className="add-container">
					ㅗㅑ
				</div>
			</ModalComponent>
		</div >
	);
}

export default AdminShowSchedule;