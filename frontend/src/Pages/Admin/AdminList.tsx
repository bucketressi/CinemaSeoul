import { Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { BookComponent, PageTitle, PayComponent } from '../../Components';

const AdminList = () => {
	const [mode, setMode] = useState<number>(0); // 0 : 예매 내역, 1: 결제 내역

	const handleModeChange = (e: any, newValue: number) => {
		setMode(newValue);
	}
	
	return (
		<div>
			<PageTitle
				title="내역 관리"
				isButtonVisible={false}
			/>
			<Tabs
				value={mode}
				onChange={handleModeChange}
				className="mypage-tab"
				indicatorColor="primary"
			>
				<Tab label="예매내역조회" />
				<Tab label="결제내역조회" />
			</Tabs>
			<div className="content-con">
				<div
					role="tabpanel"
					hidden={mode !== 0}
				>
					<BookComponent
						mode={mode}
					/>
				</div>
				<div
					role="tabpanel"
					hidden={mode !== 1}
				>
					<PayComponent
						mode={mode}
					/>
				</div>
			</div>
		</div>
	)
}

export default AdminList;