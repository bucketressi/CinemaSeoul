import React from 'react';
import { AdminHeader } from '.';

const AdminLayout : React.FC = ({children}) => {
	// header와 페이지들의 공통요소를 포함하는 틀
	return (
		<>
			<AdminHeader/>
			<div>
				{children}
			</div>
		</>
	);
};

export default AdminLayout;