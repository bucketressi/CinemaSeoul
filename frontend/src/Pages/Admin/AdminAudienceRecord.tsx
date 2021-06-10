import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../Components';
import { AudienceRecordType } from '../../Main/Type';
import { getDateString } from '../../Function';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';

import "../../scss/pages/adminaudience.scss";

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
			<div className="audience-wrap">
				<div className="search-con">
					<div>특정 기간 동안의 관람 현황 조회</div>
					<div>
						<TextField className="search-obj" InputLabelProps={{ shrink: true }} label="시작일자" type="date" value={getDateString(startDate)} onChange={(e: any) => setStartDate(e.target.value.split("-").join(""))} />
						<TextField className="search-obj" InputLabelProps={{ shrink: true }} label="종료일자" type="date" value={getDateString(endDate)} onChange={(e: any) => setEndDate(e.target.value.split("-").join(""))} />
						<Button className="search-obj-btn" variant="contained" color="primary" onClick={fetchAudience}>조회</Button>
					</div>
				</div>
				<div className="result-con">
					{
						audienceData ?
						<div>
							<div className="total-audi-con">
								<div className="result-title">해당 기간 동안의 총 관객수</div>
								<div className="result-content">{audienceData.sum}명</div>
							</div>
							<div className="date-audi-con">
								<div className="result-title">일자별 관객수</div>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell className="table-title">일자</TableCell>
											<TableCell className="table-title">관람객 수</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{
											audienceData.records.map((component) => (
												<TableRow key={component.reco_date}>
													<TableCell className="table-content">{component.reco_date}</TableCell>
													<TableCell className="table-content">{component.audi_amount}명</TableCell>
												</TableRow>
											))
										}
									</TableBody>
								</Table>
							</div>
						</div>
						: <div>아직까지 관람현황 데이터가 없습니다.</div>
					}
				</div>
			</div>
		</div>
	);
}

export default AdminAudienceRecord;