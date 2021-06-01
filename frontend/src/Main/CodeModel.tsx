import React, { useState, useContext, createContext, Dispatch, useEffect } from 'react';
import { childrenObj, Code, CodeType, CodeMatch } from './Type';

const initialUserCode = [{
	"code_id": "100001",
	"parent_code": "100",
	"code_name": "회원"
},
{
	"code_id": "100002",
	"parent_code": "100",
	"code_name": "비회원"
}];
const initialUserAuthCode = [{
	"code_id": "110001",
	"parent_code": "110",
	"code_name": "Friends"
},
{
	"code_id": "110002",
	"parent_code": "110",
	"code_name": "Family"
},
{
	"code_id": "110003",
	"parent_code": "110",
	"code_name": "VIP"
}];
const initialAdminCode = [{
	"code_id": "120001",
	"parent_code": "120",
	"code_name": "매니저"
},
{
	"code_id": "120002",
	"parent_code": "120",
	"code_name": "직원"
}];
const initialMovieAuthCode = [{
	"code_id": "200001",
	"parent_code": "200",
	"code_name": "ALL"
},
{
	"code_id": "200002",
	"parent_code": "200",
	"code_name": "12세"
},
{
	"code_id": "200003",
	"parent_code": "200",
	"code_name": "15세"
},
{
	"code_id": "200004",
	"parent_code": "200",
	"code_name": "18세(청소년 이용 불가)"
}];
const initialPeopleTypeCode = [{
	"code_id": "210001",
	"parent_code": "210",
	"code_name": "감독"
},
{
	"code_id": "210002",
	"parent_code": "210",
	"code_name": "배우"
}];
const initialGenreCode = [
	{
		"code_id": "220001",
		"parent_code": "220",
		"code_name": "액션"
	},
	{
		"code_id": "220002",
		"parent_code": "220",
		"code_name": "멜로"
	},
	{
		"code_id": "220003",
		"parent_code": "220",
		"code_name": "드라마"
	},
	{
		"code_id": "220004",
		"parent_code": "220",
		"code_name": "코미디"
	},
	{
		"code_id": "220005",
		"parent_code": "220",
		"code_name": "무협"
	},
	{
		"code_id": "220006",
		"parent_code": "220",
		"code_name": "SF"
	},
	{
		"code_id": "220007",
		"parent_code": "220",
		"code_name": "에로"
	},
	{
		"code_id": "220008",
		"parent_code": "220",
		"code_name": "애니메이션"
	},
	{
		"code_id": "220009",
		"parent_code": "220",
		"code_name": "공포"
	},
	{
		"code_id": "220010",
		"parent_code": "220",
		"code_name": "뮤지컬"
	}];
const initialSeatTypeCode = [{
	"code_id": "230   ",
	"parent_code": null,
	"code_name": "좌석구분"
},
{
	"code_id": "230001",
	"parent_code": "230",
	"code_name": "일반"
},
{
	"code_id": "230002",
	"parent_code": "230",
	"code_name": "장애인석"
},
{
	"code_id": "230003",
	"parent_code": "230",
	"code_name": "불가"
},
{
	"code_id": "230004",
	"parent_code": "230",
	"code_name": "거리두기"
}];
const initialPointTypeCode = [{
	"code_id": "300001",
	"parent_code": "300",
	"code_name": "적립"
},
{
	"code_id": "300002",
	"parent_code": "300",
	"code_name": "사용"
},
{
	"code_id": "300003",
	"parent_code": "300",
	"code_name": "취소"
},
{
	"code_id": "300004",
	"parent_code": "300",
	"code_name": "적립취소"
}];
const initialProductCode = [{
	"code_id": "310001",
	"parent_code": "310",
	"code_name": "스낵"
},
{
	"code_id": "310002",
	"parent_code": "310",
	"code_name": "관람권"
},
{
	"code_id": "310003",
	"parent_code": "310",
	"code_name": "굿즈"
},
{
	"code_id": "310004",
	"parent_code": "310",
	"code_name": "패키지"
}];
const initialPayTypeCode = [{
	"code_id": "320001",
	"parent_code": "320",
	"code_name": "신용카드"
},
{
	"code_id": "320002",
	"parent_code": "320",
	"code_name": "간편결제"
},
{
	"code_id": "320003",
	"parent_code": "320",
	"code_name": "휴대폰결제"
}];
const initialPayStateCode = [{
	"code_id": "330001",
	"parent_code": "330",
	"code_name": "결제완료"
},
{
	"code_id": "330002",
	"parent_code": "330",
	"code_name": "결제취소"
},
{
	"code_id": "330003",
	"parent_code": "330",
	"code_name": "결제확정"
}];
const userCodeState = createContext<CodeType[]>([]);
const userAuthCodeState = createContext<CodeType[]>([]);
const adminCodeState = createContext<CodeType[]>([]);
const movieAuthCodeState = createContext<CodeType[]>([]);
const peopleTypeCodeState = createContext<CodeType[]>([]);
const genreCodeState = createContext<CodeType[]>([]);
const seatTypeCodeState = createContext<CodeType[]>([]);
const pointTypeCodeState = createContext<CodeType[]>([]);
const productCodeState = createContext<CodeType[]>([]);
const payTypeCodeState = createContext<CodeType[]>([]);
const payStateCodeState = createContext<CodeType[]>([]);

export const CodeContextProvider = ({ children }: childrenObj) => {
	/*
	useEffect(() => {
		// 처음에 코드 받아오기
		axios.get(`${SERVER_URL}/code/list`)
			.then((res) => {
				res.data.forEach(async (data: CodeType) => {
					await setDataToCode(data);
				})
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}, []);

	const setDataToCode = async (data : CodeType) => {
		if (data.parent_code === null) {
			// 상위 코드 등록
			const newCodeObj = await Object.assign({}, code);
			const codeNum = Number(data.code_id);
			if (!newCodeObj[codeNum])
				newCodeObj[codeNum] = [];
			await setCode(newCodeObj);

			const newCodeStr = await Object.assign({}, codeString);
			newCodeStr[codeNum] = data.code_name;
			await setCodeString(newCodeStr);
		} else {
			// 하위 코드 등록
			const newCodeObj = await Object.assign({}, code);
			const parentNum = Number(data.parent_code);
			const codeNum = Number(data.code_id);
			if (!newCodeObj[parentNum]) {
				newCodeObj[parentNum] = [];
			}

			newCodeObj[parentNum].push(data.code_name);
			await setCode(newCodeObj);

			const newCodeStr = await Object.assign({}, codeString);
			newCodeStr[codeNum] = data.code_name;
			await setCodeString(newCodeStr);
		}
	}
	*/
	return (
		<userCodeState.Provider value={initialUserCode}>
			<userAuthCodeState.Provider value={initialUserAuthCode}>
				<adminCodeState.Provider value={initialAdminCode}>
					<movieAuthCodeState.Provider value={initialMovieAuthCode}>
						<peopleTypeCodeState.Provider value={initialPeopleTypeCode}>
							<genreCodeState.Provider value={initialGenreCode}>
								<seatTypeCodeState.Provider value={initialSeatTypeCode}>
									<pointTypeCodeState.Provider value={initialPointTypeCode}>
										<productCodeState.Provider value={initialProductCode}>
											<payTypeCodeState.Provider value={initialPayTypeCode}>
												<payStateCodeState.Provider value={initialPayStateCode}>
													{children}
												</payStateCodeState.Provider>
											</payTypeCodeState.Provider>
										</productCodeState.Provider>
									</pointTypeCodeState.Provider>
								</seatTypeCodeState.Provider>
							</genreCodeState.Provider>
						</peopleTypeCodeState.Provider>
					</movieAuthCodeState.Provider>
				</adminCodeState.Provider>
			</userAuthCodeState.Provider>
		</userCodeState.Provider>
	)
};

export function useUserCodeState() {
	const context = useContext(userCodeState);
	return context;
}
export function useUserAuthCodeState() {
	const context = useContext(userAuthCodeState);
	return context;
}
export function useAdminCodeState() {
	const context = useContext(adminCodeState);
	return context;
}
export function useMovieAuthCodeState() {
	const context = useContext(movieAuthCodeState);
	return context;
}
export function usePeopleTypeCodeState() {
	const context = useContext(peopleTypeCodeState);
	return context;
}
export function useGenreCodeState() {
	const context = useContext(genreCodeState);
	return context;
}
export function useSeatTypeCodeState() {
	const context = useContext(seatTypeCodeState);
	return context;
}
export function usePointTypeCodeState() {
	const context = useContext(pointTypeCodeState);
	return context;
}
export function useProductTypeCodeState() {
	const context = useContext(productCodeState);
	return context;
}
export function usePayTypeCodeState() {
	const context = useContext(payTypeCodeState);
	return context;
}
export function usePayStateCodeState() {
	const context = useContext(payStateCodeState);
	return context;
}