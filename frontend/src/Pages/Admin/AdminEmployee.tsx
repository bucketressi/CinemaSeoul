import React, { useState, useEffect, useContext, createContext, Dispatch } from 'react';
import "../../scss/pages/adminemployee.scss";

import { Link } from 'react-router-dom';
import { ModalComponent, PageTitle } from '../../Components';
import { AdminType } from '../../Main/Type';
import { Button, TextField, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import "../../scss/pages/adminemployee.scss";

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
			admi_auth : "12",
			position : "깍두기",
			address : "??",
			start_date : "2020/02/20"
		}, {
			admi_id : 2,
			admi_name : "우희은",
			birth : "19970606",
			phone_num : "01077777777",
			email : "wus2363@gmail.com",
			password : "rhekgus12!!",
			admi_auth : "11",
			position : "보스",
			address : "???",
			start_date : "2020/02/20"
		}
	]
	
	const [employeeList, setEmployeeList] = useState<AdminType[]>([]);
	const [open, setOpen] = useState<boolean>(false);
	const [totalPage, setTotalPage] = useState<number>(1);
	const [page, setPage] = useState<number>(1);


	const [openAddModal, setOpenAddModal] = useState<boolean>(false);
	const [openModifyModal, setOpenModifyModal] = useState<boolean>(false);
	const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);

	const handleOpenAddModal = () => {
		setOpenAddModal(true);
	}
	const handleOpenModifyModal = () => {
		setOpenModifyModal(true);
	}
	const handleOpenInfoModal = () => {
		setOpenInfoModal(true);
	}

	useEffect(() => {
		//처음에 직원데이터 받아오기
		setEmployeeList(employeeListData);
	}, []) //초기화시 employeeListData에 있는 데이터가 Employee에 들어감

	const saveEmployee = () => {
		
	}

	return (
		<>
			<PageTitle title="직원 관리" isButtonVisible={false}/>
			<div className="employee-wrap">
				<div className="employee-content-con">
					<div className="add-con">
						<Button variant="outlined" color="primary" onClick={handleOpenAddModal}>직원 추가</Button>
					</div>
					<div className="employee-list-con">
						<Table>
							<TableHead>
								<TableRow>
									<TableCell className="table-title">이름</TableCell>
									<TableCell className="table-title">직급</TableCell>
									<TableCell className="table-title">근무시작일</TableCell>
									<TableCell className="table-title"></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									employeeList &&
									employeeList.map((employee: AdminType, index: number) => (
										<TableRow key={employee.admi_id}>
											<TableCell className="table-content">{employee.admi_name}</TableCell>
											<TableCell className="table-content">{employee.position}</TableCell>
											<TableCell className="table-content">{employee.start_date}</TableCell>
											<TableCell className="modify-btn-con">
												<Button variant="contained" color="primary" onClick={handleOpenInfoModal}>세부정보</Button>
												<Button variant="contained" color="secondary" >삭제</Button>
											</TableCell>
										</TableRow>
									))
								}
							</TableBody>
						</Table>
						{
							/*</div><Pagination className="pagination" count={totalPage} page={page} onChange={handlePageChange} /> */
						}
					</div>
				</div>		
				<ModalComponent
					open={openAddModal}
					setOpen={setOpenAddModal}
					title="직원 추가"
					button="추가"
					//buttonOnClick={addEmployee}
				>
					<div className="employee-modal">
						<div>
							<TextField
								className="modal-input"
								variant="outlined"
								label="이름"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 30 }}
								//value={name}
								placeholder="이름"
								//onChange={handleNameChange}
							/>
							<TextField
								className="modal-input"
								variant="outlined"
								label="휴대전화번호"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 11 }}
								//value={phone}
								placeholder="휴대전화번호"
								//onChange={handlePhoneNumChange}
							/>
						</div>
						<div>
							<TextField
								className="modal-input"
								variant="outlined"
								label="이메일"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 40 }}
								//value={email}
								placeholder="이메일"
								//onChange={handleEmailChange}
							/>
							<TextField
								className="modal-input"
								variant="outlined"
								label="패스워드"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 100 }}
								//value={password}
								placeholder="패스워드"
								//onChange={handlePasswordChange}
							/>
						</div>
						<div>
							<TextField
								className="modal-input"
								variant="outlined"
								label="생년월일"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 8 }}
								//value={birth}
								placeholder="ex) 19970313"
								//onChange={handleBirthChange}
							/>
							<TextField
								className="modal-input"
								variant="outlined"
								label="근무시작일"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 8 }}
								//value={birth}
								placeholder="ex) 20210101"
								//onChange={handleBirthChange}
							/>
							
						</div>
						<div>
							<TextField
								className="modal-input"
								variant="outlined"
								label="권한"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 1 }}
								//value={auth}
								placeholder="0 또는 1"
								//onChange={handleAuthChange}
							/>
							<TextField
								className="modal-input"
								variant="outlined"
								label="직급"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 30 }}
								//value={position}
								placeholder="직급"
								//onChange={handlePositionChange}
							/>
						</div>
						<div>
							<TextField
								className="modal-input-long"
								variant="outlined"
								label="주소"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 30 }}
								//value={address}
								placeholder="주소"
								//onChange={handleAddressChange}
							/>
						</div>
					</div>
				</ModalComponent>

				<ModalComponent
					open={openModifyModal}
					setOpen={setOpenModifyModal}
					title="직원정보 수정"
					button="저장"
					buttonOnClick={saveEmployee}
				>
					<div className="employee-modal">
						<div>
							<TextField
								className="modal-info"
								label="이름"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 30 }}
								//value={name}
								defaultValue="고다현"
								//onChange={handleNameChange}
							/>
							<TextField
								className="modal-info"
								label="휴대전화번호"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 11 }}
								//value={phone}
								defaultValue="01077777777"
								//onChange={handlePhoneNumChange}
							/>
						</div>
						<div>
							<TextField
								className="modal-info"
								label="이메일"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 40 }}
								//value={email}
								defaultValue="wus2363@gmail.com"
								//onChange={handleEmailChange}
							/>
							<TextField
								className="modal-info"
								label="패스워드"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 100 }}
								//value={password}
								defaultValue="imsad!!!"
								//onChange={handlePasswordChange}
							/>
						</div>
						<div>
							<TextField
								className="modal-info"
								label="생년월일"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 8 }}
								//value={birth}
								defaultValue="19970313"
								//onChange={handleBirthChange}
							/>
							<TextField
								className="modal-info"
								label="근무시작일"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 8 }}
								//value={birth}
								defaultValue="20210101"
								//onChange={handleBirthChange}
							/>
							
						</div>
						<div>
							<TextField
								className="modal-info"
								label="권한"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 1 }}
								//value={auth}
								defaultValue="1"
								//onChange={handleAuthChange}
							/>
							<TextField
								className="modal-info"
								label="직급"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 30 }}
								//value={position}
								defaultValue="깍두기"
								//onChange={handlePositionChange}
							/>
						</div>
						<div>
							<TextField
								className="modal-info-long"
								label="주소"
								InputLabelProps={{shrink:true}}
								inputProps={{ maxLength: 30 }}
								//value={address}
								defaultValue="서울시 어딘가"
								//onChange={handleAddressChange}
							/>
						</div>
					</div>
				</ModalComponent>


				{/* 직원정보 조회 모달 */}
				{/* 해당 직원의 정보를 모달에 띄우고싶은데 어떻게 하는지,, */}
				<ModalComponent
					open={openInfoModal}
					setOpen={setOpenInfoModal}
					title="직원정보"
					button="수정"
					buttonOnClick={handleOpenModifyModal}
				>
					<div className="employee-modal">
						<div>
							<TextField
								className="modal-info"
								label="이름"
								defaultValue="고다현" /* {modalEmployee.admi_name} */
								InputProps={{
									readOnly: true,
								}}
							/>
							<TextField
								className="modal-info"
								label="휴대전화번호"
								defaultValue="01077777777" /* {modalEmployee.phone_num} */
								InputProps={{
									readOnly: true,
								}}
							/>
						</div>
						<div>
							<TextField
								className="modal-info"
								label="이메일"
								defaultValue="wus2363@gmail.com" /* {modalEmployee.email} */
								InputProps={{
									readOnly: true,
								}}
							/>
							<TextField
								className="modal-info"
								label="패스워드"
								defaultValue="imsad!!" /* {modalEmployee.password} */
								InputProps={{
									readOnly: true,
								}}
							/>
						</div>
						<div>
							<TextField
								className="modal-info"
								label="생년월일"
								defaultValue="19970101" /* {modalEmployee.birth} */
								InputProps={{
									readOnly: true,
								}}
							/>
							<TextField
								className="modal-info"
								label="근무시작일"
								defaultValue="20210101" /* {modalEmployee.start_date} */
								InputProps={{
									readOnly: true,
								}}
							/>
							
						</div>
						<div>
							<TextField
								className="modal-info"
								label="권한"
								defaultValue="1" /* {modalEmployee.admi_auth} */
								InputProps={{
									readOnly: true,
								}}
							/>
							<TextField
								className="modal-info"
								label="직급"
								defaultValue="깍두기" /* {modalEmployee.position} */
								InputProps={{
									readOnly: true,
								}}
							/>
						</div>
						<div>
							<TextField
								className="modal-info-long"
								label="주소"
								defaultValue="서울시 어딘가" /* {modalEmployee.address} */
								InputProps={{
									readOnly: true,
								}}
							/>
						</div>
					</div>
				</ModalComponent>
			</div>
		</>
	);
}

export default AdminEmployee;