import React, { useState, useContext, createContext, Dispatch, useEffect } from 'react';
import { childrenObj, Code, CodeType, CodeMatch } from './Type';
import axios from 'axios';
import { SERVER_URL } from '../CommonVariable';
import { errorHandler } from './ErrorHandler';
import { useTokenDispatch } from './TokenModel';
import { useHistory } from 'react-router-dom';

const codeState = createContext<Code>({});
const codeDispatch = createContext<Dispatch<Code>>(() => { });

export const CodeContextProvider = ({ children }: childrenObj) => {
	const [code, setCode] = useState<Code>({});
	const [codeString, setCodeString] = useState<CodeMatch>({});


	// useEffect(() => {
	// 	// 처음에 코드 받아오기
	// 	axios.get(`${SERVER_URL}/code/list`)
	// 		.then((res) => {
	// 			res.data.forEach(async (data: CodeType) => {
	// 				await setDataToCode(data);
	// 			})
	// 		})
	// 		.catch((e) => {
	// 			errorHandler(e, true);
	// 		});
	// }, []);

	// const setDataToCode = async (data : CodeType) => {
	// 	if (data.parent_code === null) {
	// 		// 상위 코드 등록
	// 		const newCodeObj = await Object.assign({}, code);
	// 		const codeNum = Number(data.code_id);
	// 		if (!newCodeObj[codeNum])
	// 			newCodeObj[codeNum] = [];
	// 		await setCode(newCodeObj);

	// 		const newCodeStr = await Object.assign({}, codeString);
	// 		newCodeStr[codeNum] = data.code_name;
	// 		await setCodeString(newCodeStr);
	// 	} else {
	// 		// 하위 코드 등록
	// 		const newCodeObj = await Object.assign({}, code);
	// 		const parentNum = Number(data.parent_code);
	// 		const codeNum = Number(data.code_id);
	// 		if (!newCodeObj[parentNum]) {
	// 			newCodeObj[parentNum] = [];
	// 		}

	// 		newCodeObj[parentNum].push(data.code_name);
	// 		await setCode(newCodeObj);

	// 		const newCodeStr = await Object.assign({}, codeString);
	// 		newCodeStr[codeNum] = data.code_name;
	// 		await setCodeString(newCodeStr);
	// 	}
	// }

	return (
		<codeState.Provider value={code}>
			<codeDispatch.Provider value={setCode}>
				{children}
			</codeDispatch.Provider>
		</codeState.Provider>
	)
};

export function useCodeState() {
	const context = useContext(codeState);
	return context;
}
export function useCodeDispatch() {
	const context = useContext(codeDispatch);
	return context;
}