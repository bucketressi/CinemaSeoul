import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../Components';
import { useHistory } from 'react-router-dom';
import { ListItem, ListItemAvatar, Avatar, ListItemSecondaryAction, ListItemText, Checkbox, Switch } from '@material-ui/core';
import { ShowScheduleType } from '../../Main/Type';
import { useShowScheduleListState } from '../../Main/ShowScheduleModel';
import { Schedule } from '@material-ui/icons';

const AdminShowSchedule = () => {
	const history = useHistory();
	const showScheduleList = useShowScheduleListState();
	const [scheduleList, setScheduleList] = useState<ShowScheduleType[]>([]);
	const [mode, setMode] = useState<boolean>(true);

	useEffect(() => {
		if(showScheduleList?.showschedule_list == undefined)
			return;
		setScheduleList(showScheduleList.showschedule_list);
	},[showScheduleList]);

	const gotoScheduleExact = (id : number) => {
		history.push(`/admin/showschedule/${id}`);
	}

	const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.checked);
		setMode(event.target.checked);
	}

	return (
		<div>
			<PageTitle title="상영일정 페이지" isButtonVisible={true} />
			<div className="schedule-con">
				<div>
					<div>{mode?"표" : "리스트"}</div>
					<Switch
						checked={mode}
						onChange={handleModeChange}
						color="primary"
						name={mode?"표" : "리스트"}
					/>
				</div>
				{
					mode?
						<div>표</div>
						:
						scheduleList.map((schedule : ShowScheduleType, index : number) => {
							console.log(schedule);
							return (
								<ListItem key={schedule.show_id} button onClick={() => gotoScheduleExact(schedule.show_id)}>
									<ListItemText primary={`${index+1}번`} />
									<ListItemText primary={`상영관 : ${schedule.hall_name}`} />
									<ListItemText primary={`영화명 : ${schedule.movi_name}`} />
									<ListItemText primary={`개봉 일자 : ${schedule.show_date.substr(0,4)}/${schedule.show_date.substr(4,2)}/${schedule.show_date.substr(6,2)}`} />
									<ListItemText primary={`런타임 : ${schedule.show_time}`} />
								</ListItem>
							);
						})
				}
			</div>
		</div>
	);
}

export default AdminShowSchedule;