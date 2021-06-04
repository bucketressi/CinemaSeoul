import React from 'react';
import { Button } from '@material-ui/core';
import { PageTitle } from '../../Components';
import { useHistory } from "react-router-dom";
import "../../scss/pages/adminmain.scss";

const AdminMain = () => {
	const history = useHistory();

	return (
		<div>
			<PageTitle title="관리자 사이트" isButtonVisible={false}/>
			<div className="link-con">
				<Button variant="outlined" color="primary" onClick={() => history.push("/admin/movie")}>영화 리스트 바로가기</Button>
				<Button variant="outlined" color="primary" onClick={() => history.push("/admin/hall")}>상영관 리스트 바로가기</Button>
				<Button variant="outlined" color="primary" onClick={() => history.push("/admin/showschedule")}>상영일정 리스트 바로가기</Button>
			</div>
		</div>
	);
};

export default AdminMain;