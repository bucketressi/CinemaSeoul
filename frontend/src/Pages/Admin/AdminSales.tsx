import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../Components';
import { SalesType } from '../../Main/Type';
import { getDateString, getDateStringFromDate } from '../../Function';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';

const AdminSales = () => {
	const AUTH_TOKEN = useTokenState();

	/* 조회 */
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");

	const [salesData, setSalesData] = useState<SalesType | undefined>(undefined);

	useEffect(() => {
		fetchSales();
	}, []);

	const fetchSales = () => {
		axios.post(`${SERVER_URL}/sales`, {
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
				setSalesData(res.data);
			})
			.catch((e) => {
			});
	}

	const calculateTodaySales = () => {
		axios.get(`${SERVER_URL}/sales/update`, {
			headers: {
				"TOKEN": AUTH_TOKEN
			}
		})
			.then((res) => {
				alert("오늘의 매출이 성공적으로 계산되었습니다. 자정에 다시 한 번 계산됩니다.");
			})
			.catch((e) => {
				errorHandler(e, true);
			});
	}

	return (
		<div>
			<PageTitle
				title="매출관리"
				isButtonVisible={false}
			/>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div>
					<div>특정 기간 동안의 매출 조회</div>
					<TextField InputLabelProps={{ shrink: true }} label="시작일자" type="date" value={getDateString(startDate)} onChange={(e: any) => setStartDate(e.target.value.split("-").join(""))} />
					<TextField InputLabelProps={{ shrink: true }} label="종료일자" type="date" value={getDateString(endDate)} onChange={(e: any) => setEndDate(e.target.value.split("-").join(""))} />
					<Button variant="contained" color="primary" onClick={fetchSales}>조회</Button>
					<Button variant="contained" color="secondary" onClick={calculateTodaySales}>오늘 매출 계산</Button>
				</div>
				<div>
					{
						salesData &&
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>영화 매출</TableCell>
									<TableCell>상품 매출</TableCell>
									<TableCell>총 매출</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell>{salesData.movi_total}원</TableCell>
									<TableCell>{salesData.prod_total}원</TableCell>
									<TableCell>{salesData.total_sum}원</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					}
					{
						salesData?.sales ?
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>일자</TableCell>
										<TableCell>영화 매출</TableCell>
										<TableCell>상품 매출</TableCell>
										<TableCell>총 매출</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										salesData.sales.map((sale) => (
											<TableRow key={sale.sale_date}>
												<TableCell>{getDateString(sale.sale_date)}</TableCell>
												<TableCell>{sale.movi_sale}원</TableCell>
												<TableCell>{sale.prod_sale}원</TableCell>
												<TableCell>{sale.total_sale}원</TableCell>
											</TableRow>
										))
									}
								</TableBody>
							</Table>
							: <div>아직 매출 데이터가 없습니다.</div>
					}
				</div>
			</div>
		</div>
	);
}

export default AdminSales;