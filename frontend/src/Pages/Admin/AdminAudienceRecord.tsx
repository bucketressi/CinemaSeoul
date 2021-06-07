import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../Components';
import { AudienceRecordType } from '../../Main/Type';
import { getDateString } from '../../Function';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';

const AdminAudienceRecord = () => {
	const AUTH_TOKEN = useTokenState();

	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");

	const [audienceData, setAudienceData] = useState<AudienceRecordType | undefined>(undefined);

	useEffect(() => {
		fetchAudience();
	}, []);

	const fetchAudience = () => {
		axios.post(`${SERVER_URL}/record`, {
			"start_date": startDate === "" ? null : startDate,
			"end_date": endDate === "" ? null : endDate,
		}, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				if (!res.data)
					return;
				setAudienceData(res.data);
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<div>
			<PageTitle
				title="관람현황"
				isButtonVisible={false}
			/>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div>
					<div>특정 기간 동안의 관람 현황 조회</div>
					<TextField InputLabelProps={{ shrink: true }} label="시작일자" type="date" value={getDateString(startDate)} onChange={(e: any) => setStartDate(e.target.value.split("-").join(""))} />
					<TextField InputLabelProps={{ shrink: true }} label="종료일자" type="date" value={getDateString(endDate)} onChange={(e: any) => setEndDate(e.target.value.split("-").join(""))} />
					<Button variant="contained" color="primary" onClick={fetchAudience}>조회</Button>
				</div>
				<div>
					{
						audienceData &&
						<div>
							<div>{audienceData.sum}명</div>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>일자</TableCell>
										<TableCell>관람객 수</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										audienceData.records.map((component) => (
											<TableRow key={component.reco_date}>
												<TableCell>{component.reco_date}</TableCell>
												<TableCell>{component.audi_amount}명</TableCell>
											</TableRow>
										))
									}

								</TableBody>
							</Table>
						</div>
					}
				</div>
			</div>
		</div>
	)
}

export default AdminAudienceRecord;