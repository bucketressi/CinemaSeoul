import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { PageTitle } from '../../Components';

interface MatchParams {
	product_id: string
}

const AdminProductModify : React.FunctionComponent<RouteComponentProps<MatchParams>> = ({match}) => {
	return (
		<div>
			<PageTitle
				title="상품 수정 페이지"
				isButtonVisible={true}
			/>
			<div>

			</div>
		</div>
	);
}

export default AdminProductModify;