import React, { useState, useEffect, useContext, createContext, Dispatch } from 'react';
import "../../scss/pages/adminemployee.scss";

import { Link } from 'react-router-dom';
import { ModalComponent, PageTitle } from '../../Components';
import { AdminType } from '../../Main/Type';
import { Button, TextField, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@material-ui/core';

import { TextRotateVerticalTwoTone } from '@material-ui/icons';

const AdminEmployee = () => {

	//더미데이터 적기
	const employeeListData : AdminType[] = [
		{
			admi_id : 1,
			admi_name : "고다현",
			birth : "19970313",
			phone_num : "01072409621",
			email : "ekgusdl__@naver.com",
			password : "rhekgus12!",
			admi_auth_code : "12",
			position : "boss",
			address : "??",
			start_date : "2020/02/20"
		}, {
			admi_id : 2,
			admi_name : "우희은",
			birth : "19970606",
			phone_num : "01077777777",
			email : "wus2363@gmail.com",
			password : "rhekgus12!!",
			admi_auth_code : "11",
			position : "boss",
			address : "???",
			start_date : "2020/02/20"
		}
	]
	
	const [employeeList, setEmployeeList] = useState<AdminType[]>([]);
	const [open, setOpen] = useState<boolean>(false);

	const [name, setName] = useState<string>("");
	const [birth, setBirth] = useState<string>("");
	const [phoneNum, setPhoneNum] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [auth, setAuth] = useState<string>("");
	const [position, setPosition] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [startDate, setStartDate] = useState<string>("");

	const handleNameChange = (e: any) => { setName(e.target.value); };
	const handleBirthChange = (e: any) => { setBirth(e.target.value); };
	const handlePhoneNumChange = (e: any) => { setPhoneNum(e.target.value); };
	const handleEmailChange = (e: any) => { setEmail(e.target.value); };
	const handlePasswordChange = (e: any) => { setPassword(e.target.value); };
	const handleAuthChange = (e: any) => { setAuth(e.target.value); };
	const handlePositionChange = (e: any) => { setPosition(e.target.value); };
	const handleAddressChange = (e: any) => { setAddress(e.target.value); };
	const handleStartDateChange = (e: any) => { setStartDate(e.target.value); };

	const addEmployee = () => {
		// 직원 추가 api 호출
		console.log("addEmployee");
	}

	useEffect(() => {
		//처음에 직원데이터 받아오기
		setEmployeeList(employeeListData);
	}, []) //초기화시 employeeListData에 있는 데이터가 Employee에 들어감

	const SimpleEmployee = (employee: any) => {
		return(
			<div>
				<div>{employee.admi_id}</div>
				<div>{employee.admi_name}</div>
				<div>{employee.position}</div>
				<div>{employee.start_date}</div>
			</div>
		);
	}

	return (
		<>
			<PageTitle title="직원 관리" isButtonVisible={true}/>
			<div className="employee-wrap">
				<div className="employee-content-con">
					<div className="employee-menu">
						<Button variant="outlined" color="primary" onClick={() => setOpen(true)}>직원 추가</Button>
					</div>
					<div className="employee-list-con">
						{
							employeeList && 
							employeeList[0] && 
							<div>{employeeList[0].admi_name}</div>
						}
					</div>
				</div>
				<ModalComponent
					open={open}
					setOpen={setOpen}
					title="직원 추가"
					button="추가"
					buttonOnClick={addEmployee}
				>
					<div className="add-container">
						<div>
							<TextField variant="outlined" placeholder="이름" onChange={handleNameChange} />
							<TextField variant="outlined" placeholder="휴대전화번호" onChange={handlePhoneNumChange} />
						</div>
						<div>
							<TextField variant="outlined" placeholder="이메일" onChange={handleEmailChange} />
							<TextField variant="outlined" placeholder="패스워드" onChange={handlePasswordChange} />
						</div>
						<div>
							<TextField variant="outlined" placeholder="생년월일" onChange={handleBirthChange} />
							<TextField variant="outlined" placeholder="근무시작일" onChange={handleStartDateChange} />
						</div>
						<div>
							<TextField variant="outlined" placeholder="권한코드" onChange={handleAuthChange} />
							<TextField variant="outlined" placeholder="직책" onChange={handlePositionChange} />
						</div>
						<div>
							<TextField variant="outlined" placeholder="주소" onChange={handleAddressChange} />
						</div>
					</div>
				</ModalComponent>
			</div>
		</>
	);
}

export default AdminEmployee;
