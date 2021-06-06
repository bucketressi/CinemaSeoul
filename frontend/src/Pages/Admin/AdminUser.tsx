import React, { useEffect } from 'react';

import { UserPointType } from '../../Main/Type';

import axios from 'axios';
import { SERVER_URL } from '../../CommonVariable';
import { errorHandler } from '../../Main/ErrorHandler';
import { useTokenState } from '../../Main/TokenModel';
import { PageTitle } from '../../Components';

const AdminUser = () => {
	const AUTH_TOEKN = useTokenState();

	/** 조회 */
	useEffect(() => {
		fetchUserPoint();
	}, []);

	const fetchUserPoint = () => {
		// todo : 유저에게 포인트 줄 수 있게 => 나중에 구현
		
	}

	return (
		<div>
			<PageTitle
				title="회원 관리"
				isButtonVisible={false}
			/>
			<div>

			</div>
		</div>
	)
};

export default AdminUser;