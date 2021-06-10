import React, { useEffect, useState } from 'react';
import { ImgComponent, ModalComponent, PageTitle, SelectModule } from '../../Components';
import { PeopleType, PeopleExactType } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';
import { useUserState } from '../../Main/UserModel';
import { Button, TextField } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import "../../scss/pages/adminpeople.scss";
import { returnValidImg } from '../../Function';

const AdminPeople = () => {
	const AUTH_TOKEN = useTokenState();

	const [page, setPage] = useState<number>(1);
	const [totalPage, setTotalPage] = useState<number>(1);
	const handlePageChange = (e: any, pageNumber: number) => { setPage(pageNumber); };

	/* 검색 */
	const [searchName, setSearchName] = useState<string>("");

	const searchPeople = () => {
		axios.post(`${SERVER_URL}/people/search`, {
			"peop_name" : searchName
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data)
					return;
				setPeopleList(res.data);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	/* 조회 */
	const [peopleList, setPeopleList] = useState<PeopleType[] | undefined>(undefined);
	const [imgFile, setImgFile] = useState<File | undefined>(undefined);
	useEffect(() => {
		fetchPeopleList();
	}, []);

	const fetchPeopleList = () => {
		axios.post(`${SERVER_URL}/people/list`, {
			"page" : page,
			"amount" : 20
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data || !res.data.peop_list )
					return;
				setPeopleList(res.data.peop_list);
				setTotalPage(res.data.totalpage);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	/* 수정 */
	const [selectedPeople, setSelectedPeople] = useState<PeopleExactType | undefined>(undefined);
	const [openModifyModal, setOpenModifyModal] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	const [nation, setNation] = useState<string>("");
	const [birthYear, setBirthYear] = useState<string>("");
	const [birthMonth, setBirthMonth] = useState<string>("");
	const [birthDate, setBirthDate] = useState<string>("");
	const [birth, setBirth] = useState<string>("");
	const [contents, setContents] = useState<string>("");

	useEffect(() => {
		const month = birthMonth.length === 1? "0"+birthMonth : birthMonth;
		const date = birthDate.length ===1? "0"+birthDate :birthDate;
		setBirth(`${birthYear}${month}${date}`);
	}, [birthYear, birthMonth, birthDate]);

	useEffect(() => {
		if(!selectedPeople)
			return;
		setName(selectedPeople.peop_name);
		setNation(selectedPeople.nation);
		setBirthYear(selectedPeople.birth.substr(0, 4));
		setBirthMonth(Number(selectedPeople.birth.substr(4, 2)).toString());
		setBirthDate(Number(selectedPeople.birth.substr(6, 2)).toString());
		setContents(selectedPeople.peop_contents);
	}, [selectedPeople]);

	const fetchDetail = (peop_id : number) => {
		axios.get(`${SERVER_URL}/people/select/${peop_id}`, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data)
					return;
				setSelectedPeople(res.data);
				setOpenModifyModal(true);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const modifyPeople = () => {
		if(!selectedPeople)
			return;
		axios.put(`${SERVER_URL}/people/update`,{
			"peop_id" : selectedPeople.peop_id,
			"peop_name" : name,//"강동원",
			"nation" : nation,//"한국",
			"birth" : birth,//"19810118", 
			"peop_contents" : contents, //"대한민국의 배우. 수려한 외모, 186cm의 키, 그리고 112cm의 긴 다리를 소유하고 있다."
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				modifyImage();
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	const modifyImage = () => {
		if(!selectedPeople)
			return;
		if(!imgFile){
			alert("인물이 정상적으로 수정되었습니다.")
			setOpenModifyModal(false);
			fetchPeopleList();
			return;
		}

		const formData = new FormData();
		if (imgFile) {
			formData.append("image", imgFile);
		}

		axios.put(`${SERVER_URL}/people/image/${selectedPeople.peop_id}`, formData, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("인물이 정상적으로 수정되었습니다.")
				setOpenModifyModal(false);
				fetchPeopleList();
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	/* 인물 추가 */
	const [openAddModal, setOpenAddModal] = useState<boolean>(false);
	const [addName, setAddName] = useState<string>("");
	const [addNation, setAddNation] = useState<string>("");
	const [addBirthYear, setAddBirthYear] = useState<string>("");
	const [addBirthMonth, setAddBirthMonth] = useState<string>("");
	const [addBirthDate, setAddBirthDate] = useState<string>("");
	const [addBirth, setAddBirth] = useState<string>("");
	const [addContents, setAddContents] = useState<string>("");

	useEffect(() => {
		const month = addBirthMonth.length === 1? "0"+addBirthMonth : addBirthMonth;
		const date = addBirthDate.length ===1? "0"+addBirthDate :addBirthDate;
		setAddBirth(`${addBirthYear}${month}${date}`);
	}, [addBirthYear, addBirthMonth, addBirthDate]);


	const addPeople = () => {
		const formData = new FormData();

		if (imgFile) {
			formData.append("image", imgFile);
		}
		const jsonData = JSON.stringify({
			"peop_name" : addName,//"강동원",
			"nation" : addNation,//"한국",
			"birth" : addBirth,//"19810118", 
			"peop_contents" : addContents, //"대한민국의 배우. 수려한 외모, 186cm의 키, 그리고 112cm의 긴 다리를 소유하고 있다."
			"img" : null,
		});
		const blobData = new Blob([jsonData], { type: 'application/json' });

		formData.append("people", blobData);
		axios.post(`${SERVER_URL}/people/add`, formData, {
			headers: {
				"TOKEN": AUTH_TOKEN,
				"Content-Type": "multipart/form-data"
			}
		})
			.then((res) => {
				alert("인물이 정상적으로 추가되었습니다.")
				setOpenAddModal(false);
				fetchPeopleList();
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	/* 삭제 */
	const removePeople = (peop_id : number) => {
		axios.delete(`${SERVER_URL}/people/delete/${peop_id}`,{
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("인물이 정상적으로 삭제되었습니다.")
				fetchPeopleList();
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<>
			<PageTitle title="인물 리스트" isButtonVisible={false} />
			<div className="add-con">
				<Button variant="outlined" color="primary" onClick={()=>setOpenAddModal(true)}>인물 추가</Button>
			</div>
			<div className="admin-people-con">
				<div className="search-con">
					<TextField className="search-input" label="이름으로 검색" value={searchName} onChange={(e: any) => setSearchName(e.target.value)}/>
					<Button variant="contained" color="primary" onClick={searchPeople}>인물 검색</Button>
				</div>
				<div className="search-res-con">
					<div className="people-obj-list">
						<div className="people-obj">
							{
								peopleList &&
								peopleList.map((people) => (
									<div key={people.peop_id}>
										<Button variant="outlined" color="primary" onClick={() => fetchDetail(people.peop_id)}>{people.peop_name}</Button>
										<Button variant="outlined" color="secondary" onClick={() => removePeople(people.peop_id)}>삭제하기</Button>
									</div>
								))
							}
						</div>
					</div>
					<Pagination className="pagination" count={totalPage} page={page} onChange={handlePageChange} />
				</div>
				{
					selectedPeople &&
					<ModalComponent
						open={openModifyModal}
						setOpen={setOpenModifyModal}
						title="인물 수정"
						button="수정"
						buttonOnClick={modifyPeople}
					>
						<div className="people-modal">
							<TextField className="people-input" variant="outlined" label="이름" InputLabelProps={{shrink:true}} inputProps={{ maxLength: 30 }} value={name} onChange={(e: any) => setName(e.target.value)}/>
							<TextField className="people-input" variant="outlined" label="국적" InputLabelProps={{shrink:true}} inputProps={{ maxLength: 30 }} value={nation} onChange={(e: any) => setNation(e.target.value)}/>
							<div className="birth-con">
								<SelectModule tag="Year" value={birthYear} handleValueChange={(e: any) => { setBirthYear(e.target.value) }} start={1930} end={2022} />
								<SelectModule tag="Month" value={birthMonth} handleValueChange={(e: any) => { setBirthMonth(e.target.value) }} start={1} end={12} />
								<SelectModule tag="Date" value={birthDate} handleValueChange={(e: any) => { setBirthDate(e.target.value) }} start={1} end={30} />
							</div>
							<TextField className="people-input-long" label="설명" InputLabelProps={{shrink:true}} inputProps={{ maxLength: 600 }} multiline={true} value={contents} onChange={(e: any) => setContents(e.target.value)}/>
							<div>
								<div className="img-comp-container">
									<div>기존 이미지</div>
									<img src={returnValidImg(selectedPeople.imageBase64)} alt="기존 인물 사진"/>
								</div>
								<div>이미지 변경</div>
								<ImgComponent setImgFile={setImgFile}/>
							</div>
						</div>
					</ModalComponent>
				}
				<ModalComponent
					open={openAddModal}
					setOpen={setOpenAddModal}
					title="인물 추가"
					button="추가"
					buttonOnClick={addPeople}
				>
					<div className="people-modal">
						<div>
							<TextField className="people-input" variant="outlined" label="이름" InputLabelProps={{shrink:true}} inputProps={{ maxLength: 30 }} placeholder="이름" value={addName} onChange={(e: any) => setAddName(e.target.value)}/>
							<TextField className="people-input" variant="outlined" label="국가" InputLabelProps={{shrink:true}} inputProps={{ maxLength: 30 }} placeholder="국적"value={addNation} onChange={(e: any) => setAddNation(e.target.value)}/>
						</div>
						<div className="birth-con">
							<SelectModule tag="Year" value={addBirthYear} handleValueChange={(e: any) => { setAddBirthYear(e.target.value) }} start={1930} end={2022} />
							<SelectModule tag="Month" value={addBirthMonth} handleValueChange={(e: any) => { setAddBirthMonth(e.target.value) }} start={1} end={12} />
							<SelectModule tag="Date" value={addBirthDate} handleValueChange={(e: any) => { setAddBirthDate(e.target.value) }} start={1} end={31} />
						</div>
						<TextField className="people-input-long" variant="outlined" label="설명" InputLabelProps={{shrink:true}} inputProps={{ maxLength: 600 }} placeholder="설명" multiline={true} rows={3} value={addContents} onChange={(e: any) => setAddContents(e.target.value)}/>
						<div>
							<ImgComponent setImgFile={setImgFile}/>
						</div>
					</div>
				</ModalComponent>
			</div>
		</>
	);
}

export default AdminPeople;