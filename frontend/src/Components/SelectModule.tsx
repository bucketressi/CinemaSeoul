import React, { useState, useEffect } from 'react';
import { Select, FormControl, InputLabel, MenuItem, Menu } from '@material-ui/core';

type Props = {
	tag : string,
	value: string,
	handleValueChange: (event: any) => void,
	start : number,
	end : number
}

const SelectModule = ({ tag, value, handleValueChange, start, end }: Props) => {
	const [yearList, setYearList] = useState<string[]>([]);

	useEffect(() => {
		const list : string[] = [];
		let point = start;
		while(point !== end+1){
			list.push(point.toString());
			point += 1;
		}
		setYearList(list);
	}, []);

	return (
		<FormControl variant="outlined">
			<InputLabel id={`${tag}-label`}>{tag==="Year"?"생년":tag==="Month"?"월":"일"}</InputLabel>
			<Select
				labelId={`${tag}-label`}
				id={`${tag}-select`}
				value={value}
				onChange={handleValueChange}
			>
				{
					yearList.map((year : string) => <MenuItem key={year} value={year}>{year}</MenuItem>)
				}
			</Select>
		</FormControl>
	);
}

export default SelectModule;