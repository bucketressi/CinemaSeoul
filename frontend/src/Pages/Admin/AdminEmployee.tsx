import React, { useState, useEffect, useContext, createContext, Dispatch } from 'react';
import "../../scss/pages/adminemployee.scss";

import { Link } from 'react-router-dom';
import { ModalComponent, PageTitle, SelectModule } from '../../Components';
import { AdminType, SimpleAdminType } from '../../Main/Type';
import { Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem } from '@material-ui/core';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';

import "../../scss/pages/adminemployee.scss?";
import { useAdminCodeState } from '../../Main/CodeModel';
import { getDateString } from '../../Function';

const AdminEmployee = () => {
	const AUTH_TOKEN = useTokenState();
	const adminType = useAdminCodeState();

	const [employeeList, setEmployeeList] = useState<SimpleAdminType[]>([]);

	const [totalPage, setTotalPage] = useState<number>(1);
	const [page, setPage] = useState<number>(1);

	/** 조회 */
	useEffect(() => {
		fetchEmployeeList();
	}, [])

	const fetchEmployeeList = () => {
		axios.post(`${SERVER_URL}/admin/list`, {
			"page": page,
			"amount": 10
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data || !res.data.adminListInfoDtoList)
					return;
				setEmployeeList(res.data.adminListInfoDtoList);
				setTotalPage(res.data.totalpage);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	/** 수정 */
	const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);
	const [selectedEMP, setSelectedEMP] = useState<string>("");
	const [employeeInfo, setEmployeeInfo] = useState<AdminType | undefined>(undefined);

	/* 기본 정보 */
	const [name, setName] = useState<string>("");
	const [birth, setBirth] = useState<string>("");
	const [phoneNum, setPhoneNum] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [auth, setAuth] = useState<string>("");
	const [position, setPostition] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [startDate, setStartDate] = useState<string>("");

	/* 생년월일 */
	const [birthYear, setBirthYear] = useState<string>("");
	const [birthMonth, setBirthMonth] = useState<string>("");
	const [birthDate, setBirthDate] = useState<string>("");

	/* 중복 체크 */
	const [isPhoneNumExist, setPhoneNumExist] = useState<number>(-1); // -1 아직 안함, 0 중복된 번호 없음, 1 중복된 번호 있음

	useEffect(() => {
		if (!employeeInfo)
			return;
		setName(employeeInfo.admi_name);
		if (employeeInfo.birth) {
			setBirthYear(employeeInfo.birth.substr(0, 4));
			setBirthMonth(Number(employeeInfo.birth.substr(4, 2)).toString());
			setBirthDate(Number(employeeInfo.birth.substr(6, 2)).toString());
		}
		setPhoneNum(employeeInfo.phone_num);
		setEmail(employeeInfo.email);
		const tmpAuth = adminType.find((admin) => admin.code_name === employeeInfo.admi_auth);
		setAuth(tmpAuth ? tmpAuth.code_id : "");
		setPostition(employeeInfo.position);
		setAddress(employeeInfo.address);
		setStartDate(employeeInfo.start_date);
	}, [employeeInfo]);

	useEffect(() => {
		fecthExactEmployee();
		initialize();
	}, [selectedEMP]);

	useEffect(() => {
		const month = birthMonth.length === 1 ? "0" + birthMonth : birthMonth;
		const date = birthDate.length === 1 ? "0" + birthDate : birthDate;
		setBirth(`${birthYear}${month}${date}`);
	}, [birthYear, birthMonth, birthDate]);

	const handleOpenInfoModal = (admi_id: string) => {
		setSelectedEMP(admi_id);
		setOpenInfoModal(true);
		setPhoneNumExist(-1);
	}

	const initialize = () => {
		setName("");
		setBirth("");
		setPhoneNum("");
		setEmail("");
		setAuth("");
		setPostition("");
		setAddress("");
		setStartDate("");
	}

	const fecthExactEmployee = () => {
		if (selectedEMP === "")
			return;

		axios.get(`${SERVER_URL}/admin/${selectedEMP}`, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data)
					return;
				setEmployeeInfo(res.data);
			})
			.catch((e) => {
				errorHandler(e, true, ["", "", "", "해당 직원이 없습니다."]);
			});
	}

	const preTreatment = (type: number) => {
		if (type === 0) {
			if (name === "") {
				alert("이름을 입력해주세요.");
				return false;
			}
			if (password === "") {
				alert("패스워드를 입력해주세요.");
				return false;
			}
			if (!email.includes("@")) {
				alert("이메일 형식을 확인해주세요.");
				return false;
			}
			if (isPhoneNumExist === -1) {
				alert("중복된 핸드폰 번호가 있는지 버튼을 눌러 체크해주세요.");
				return false;
			}
			if (isPhoneNumExist === 1) {
				alert("중복된 핸드폰 번호가 있어 회원가입할 수 없습니다. 다른 핸드폰 번호를 입력해주세요.");
				return false;
			}
			return true;
		} else {
			if (addName === "") {
				alert("이름을 입력해주세요.");
				return false;
			}
			if (addPassword === "") {
				alert("패스워드를 입력해주세요.");
				return false;
			}
			if (!addEmail.includes("@")) {
				alert("이메일 형식을 확인해주세요.");
				return false;
			}
			if (isAddPhoneNumExist === -1) {
				alert("중복된 핸드폰 번호가 있는지 버튼을 눌러 체크해주세요.");
				return false;
			}
			if (isAddPhoneNumExist === 1) {
				alert("중복된 핸드폰 번호가 있어 회원가입할 수 없습니다. 다른 핸드폰 번호를 입력해주세요.");
				return false;
			}
			if (isAddEmailExist === -1) {
				alert("중복된 이메일이 있는지 버튼을 눌러 체크해주세요.");
				return false;
			}
			if (isAddEmailExist === 1) {
				alert("중복된 이메일이 있어 회원가입할 수 없습니다. 다른 이메일을 입력해주세요.");
				return false;
			}
			return true;
		}
	}

	const checkPhoneNum = () => {
		if (phoneNum === employeeInfo?.phone_num) {
			// 폰번호를 바꾸지 않으면
			setPhoneNumExist(0);
			alert("해당 핸드폰 번호를 사용할 수 있습니다.");
			return;
		}
		if (phoneNum === "" || phoneNum.length !== 11 || isNaN(Number(phoneNum))) {
			alert("알맞은 핸드폰 번호를 입력해주세요.");
			return;
		}
		axios.post(`${SERVER_URL}/admin/phonecheck`, {
			"phone_num": phoneNum,
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				setPhoneNumExist(0);
				alert("해당 핸드폰 번호를 사용할 수 있습니다.");
			})
			.catch((e) => {
				setPhoneNumExist(1);
				alert("중복된 핸드폰 번호가 존재합니다.");
			});
	}

	const saveEmployee = () => {
		if (!preTreatment(0))
			return;
		if (!employeeInfo)
			return;
		axios.put(`${SERVER_URL}/admin/update`, {
			"admi_id": selectedEMP,
			"admi_name": name,
			"birth": birth,
			"phone_num": phoneNum,
			"password": password,
			"admi_auth_code": auth,
			"position": position,
			"address": address,
			"start_date": startDate
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("직원을 정상적으로 수정하였습니다.");
				setOpenInfoModal(false);
			})
			.catch((e) => {
				errorHandler(e, true, ["", "중복된 이메일 또는 번호를 입력하였습니다."]);
			});
	}


	/* 추가 */
	/* 기본 정보 */
	const [addName, setAddName] = useState<string>("");
	const [addBirth, setAddBirth] = useState<string>("");
	const [addPhoneNum, setAddPhoneNum] = useState<string>("");
	const [addEmail, setAddEmail] = useState<string>("");
	const [addPassword, setAddPassword] = useState<string>("");
	const [addAuth, setAddAuth] = useState<string>("");
	const [addPosition, setAddPostition] = useState<string>("");
	const [addAddress, setAddAddress] = useState<string>("");
	const [addStartDate, setAddStartDate] = useState<string>("");

	/* 생년월일 */
	const [addBirthYear, setAddBirthYear] = useState<string>("");
	const [addBirthMonth, setAddBirthMonth] = useState<string>("");
	const [addBirthDate, setAddBirthDate] = useState<string>("");

	/* 중복 체크 */
	const [isAddPhoneNumExist, setAddPhoneNumExist] = useState<number>(-1); // -1 아직 안함, 0 중복된 번호 없음, 1 중복된 번호 있음
	const [isAddEmailExist, setAddEmailExist] = useState<number>(-1); // -1 아직 안함, 0 중복된 이메일 없음, 1 중복된 이메일 있음


	const [openAddModal, setOpenAddModal] = useState<boolean>(false);
	const handleOpenAddModal = () => {
		setOpenAddModal(true);
		setEmployeeInfo(undefined); // 이메일, 번호 체크를 통과하지 않게 하기 위해
	}

	useEffect(() => {
		const month = addBirthMonth.length === 1 ? "0" + addBirthMonth : addBirthMonth;
		const date = addBirthDate.length === 1 ? "0" + addBirthDate : addBirthDate;
		setAddBirth(`${addBirthYear}${month}${date}`);
	}, [addBirthYear, addBirthMonth, addBirthDate]);

	useEffect(() => {
		if (!openAddModal)
			return;
		initializeAdd();
	}, [openAddModal]);

	const initializeAdd = () => {
		setAddName("");
		setAddBirth("");
		setAddPhoneNum("");
		setAddEmail("");
		setAddAuth("");
		setAddPostition("");
		setAddAddress("");
		setAddStartDate("");
	}

	const checkAddPhoneNum = () => {
		if (addPhoneNum === "" || addPhoneNum.length !== 11 || isNaN(Number(addPhoneNum))) {
			alert("알맞은 핸드폰 번호를 입력해주세요.");
			return;
		}
		axios.post(`${SERVER_URL}/admin/phonecheck`, {
			"phone_num": addPhoneNum,
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				setAddPhoneNumExist(0);
				alert("해당 핸드폰 번호를 사용할 수 있습니다.");
			})
			.catch((e) => {
				setAddPhoneNumExist(1);
				alert("중복된 핸드폰 번호가 존재합니다.");
			});
	}

	const checkAddEmail = () => {
		if (addEmail === "" || !addEmail.includes("@")) {
			alert("이메일 형식을 확인해주세요.");
			return;
		}
		axios.post(`${SERVER_URL}/admin/emailcheck`, {
			"email": addEmail,
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				setAddEmailExist(0);
				alert("해당 이메일을 사용할 수 있습니다.");
			})
			.catch((e) => {
				setAddEmailExist(1);
				alert("중복된 이메일이 존재합니다.");
			});
	}

	const addEmployee = () => {
		if (!preTreatment(1))
			return;
		axios.post(`${SERVER_URL}/admin/signup`, {
			"admi_name": addName,//String,
			"birth": addBirth,//String,
			"phone_num": addPhoneNum,//String,
			"email": addEmail,//String,
			"password": addPassword,// String,
			"admi_auth_code": addAuth,//string,
			"position": addPosition,//String,
			"address": addAddress,//String,
			"start_date": addStartDate// String
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("직원을 정상적으로 추가하였습니다.");
				fetchEmployeeList();
				setOpenAddModal(false);
			})
			.catch((e) => {
				errorHandler(e, true, ["", "중복된 이메일 또는 번호를 입력하였습니다."]);
			});
	}

	/** 삭제 */
	const removeEmployee = (id : string) => {
		if(!confirm("해당 직원을 정말로 삭제하시겠습니까?"))
			return;
		axios.delete(`${SERVER_URL}/admin/delete/${id}`, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("직원을 정상적으로 삭제하였습니다.");
				fetchEmployeeList();
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<>
			<PageTitle title="직원 관리" isButtonVisible={false} />
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
									<TableCell className="table-title">직원 삭제</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									employeeList &&
									employeeList.map((employee: SimpleAdminType, index: number) => (
										<TableRow key={employee.admi_id}>
											<TableCell className="table-content" onClick={() => handleOpenInfoModal(employee.admi_id)}>{employee.admi_name}</TableCell>
											<TableCell className="table-content" onClick={() => handleOpenInfoModal(employee.admi_id)}>{employee.position}</TableCell>
											<TableCell className="table-content" onClick={() => handleOpenInfoModal(employee.admi_id)}>{employee.start_date}</TableCell>
											<TableCell className="modify-btn-con">
												<Button variant="contained" color="secondary" onClick={() => removeEmployee(employee.admi_id)} >삭제</Button>
											</TableCell>
										</TableRow>
									))
								}
							</TableBody>
						</Table>
					</div>
				</div>
				<ModalComponent
					open={openAddModal}
					setOpen={setOpenAddModal}
					title="직원 추가"
					button="추가"
					buttonOnClick={addEmployee}
				>
					<div className="employee-modal">
						<div>
							<TextField
								label="이름"
								InputLabelProps={{ shrink: true }}
								inputProps={{ maxLength: 30 }}
								value={addName}
								onChange={(e: any) => setAddName(e.target.value)}
							/>
						</div>
						<div>
							<TextField
								label="휴대전화번호"
								InputLabelProps={{ shrink: true }}
								inputProps={{ maxLength: 11 }}
								value={addPhoneNum}
								onChange={(e: any) => { setAddPhoneNum(e.target.value); }}
							/>
							<Button variant="contained" color={isAddPhoneNumExist !== 0 ? "primary" : "default"} onClick={checkAddPhoneNum}>핸드폰 번호 중복 체크</Button>
						</div>
						<div>
							<TextField
								label="이메일"
								InputLabelProps={{ shrink: true }}
								inputProps={{ maxLength: 40 }}
								value={addEmail}
								onChange={(e: any) => { setAddEmail(e.target.value); }}
							/>
							<Button variant="contained" color={isAddEmailExist !== 0 ? "primary" : "default"} onClick={checkAddEmail}>이메일 중복 체크</Button>
						</div>
						<div>
							<TextField
								label="패스워드"
								InputLabelProps={{ shrink: true }}
								inputProps={{ maxLength: 100 }}
								type="password"
								value={addPassword}
								onChange={(e: any) => { setAddPassword(e.target.value); }}
							/>
						</div>
						<div className="two-in-one">
							<div>
								<div>
									<SelectModule tag="Year" value={addBirthYear} handleValueChange={(e: any) => { setAddBirthYear(e.target.value) }} start={1930} end={2022} />
									<SelectModule tag="Month" value={addBirthMonth} handleValueChange={(e: any) => { setAddBirthMonth(e.target.value) }} start={1} end={12} />
									<SelectModule tag="Date" value={addBirthDate} handleValueChange={(e: any) => { setAddBirthDate(e.target.value) }} start={1} end={30} />
								</div>
							</div>
							<div>
								<TextField InputLabelProps={{ shrink: true }} label="근무시작일" type="date" value={getDateString(addStartDate)} onChange={(e: any) => setAddStartDate(e.target.value.split("-").join(""))} />
							</div>
						</div>
						<div className="two-in-one">
							<div className="auth-con">
								<div>권한</div>
								<Select className="select" label="권한" value={addAuth} onChange={(e: any) => setAddAuth(e.target.value)}>
									<MenuItem value={adminType[0].code_id}>{adminType[0].code_name}</MenuItem>
									<MenuItem value={adminType[1].code_id}>{adminType[1].code_name}</MenuItem>
								</Select>
							</div>
							<TextField
								label="직급"
								InputLabelProps={{ shrink: true }}
								inputProps={{ maxLength: 30 }}
								value={addPosition}
								onChange={(e: any) => setAddPostition(e.target.value)}
							/>
						</div>
						<div>
							<TextField
								label="주소"
								InputLabelProps={{ shrink: true }}
								inputProps={{ maxLength: 30 }}
								value={addAddress}
								onChange={(e: any) => setAddAddress(e.target.value)}
							/>
						</div>
					</div>
				</ModalComponent>

				<ModalComponent
					open={openInfoModal}
					setOpen={setOpenInfoModal}
					title="직원정보 수정"
					button="저장"
					buttonOnClick={saveEmployee}
				>
					<div className="employee-modal">
						<div>
							<TextField
								label="이름"
								InputLabelProps={{ shrink: true }}
								inputProps={{ maxLength: 30 }}
								value={name}
								onChange={(e: any) => setName(e.target.value)}
							/>
						</div>
						<div>
							<TextField
								label="휴대전화번호"
								InputLabelProps={{ shrink: true }}
								inputProps={{ maxLength: 11 }}
								value={phoneNum}
								onChange={(e: any) => { setPhoneNum(e.target.value); }}
							/>
							<Button variant="contained" color={isPhoneNumExist !== 0 ? "primary" : "default"} onClick={checkPhoneNum}>핸드폰 번호 중복 체크</Button>
						</div>
						<div className="two-in-one">
							<TextField
								label="이메일"
								InputLabelProps={{ shrink: true }}
								inputProps={{ maxLength: 40 }}
								value={email}
								disabled={true}
							/>
							<TextField
								label="패스워드"
								InputLabelProps={{ shrink: true }}
								inputProps={{ maxLength: 100 }}
								type="password"
								value={password}
								onChange={(e: any) => { setPassword(e.target.value); }}
							/>
						</div>
						<div className="two-in-one">
							<div>
								<div>
									<SelectModule tag="Year" value={birthYear} handleValueChange={(e: any) => { setBirthYear(e.target.value) }} start={1930} end={2022} />
									<SelectModule tag="Month" value={birthMonth} handleValueChange={(e: any) => { setBirthMonth(e.target.value) }} start={1} end={12} />
									<SelectModule tag="Date" value={birthDate} handleValueChange={(e: any) => { setBirthDate(e.target.value) }} start={1} end={30} />
								</div>
							</div>
							<div>
								<TextField label="근무시작일" type="date" value={getDateString(startDate)} onChange={(e: any) => setStartDate(e.target.value.split("-").join(""))} />
							</div>
						</div>
						<div className="two-in-one">
							<div className="auth-con">
								<div>권한</div>
								<Select className="select" label="권한" value={auth} onChange={(e: any) => setAuth(e.target.value)}>
									<MenuItem value={adminType[0].code_id}>{adminType[0].code_name}</MenuItem>
									<MenuItem value={adminType[1].code_id}>{adminType[1].code_name}</MenuItem>
								</Select>
							</div>
							<TextField
								className="modal-info"
								label="직급"
								InputLabelProps={{ shrink: true }}
								inputProps={{ maxLength: 30 }}
								value={position}
								onChange={(e: any) => setPostition(e.target.value)}
							/>
						</div>
						<div>
							<TextField
								className="modal-info-long"
								label="주소"
								InputLabelProps={{ shrink: true }}
								inputProps={{ maxLength: 30 }}
								value={address}
								onChange={(e: any) => setAddress(e.target.value)}
							/>
						</div>
					</div>
				</ModalComponent>
			</div>
		</>
	);
}

export default AdminEmployee;