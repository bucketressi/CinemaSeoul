import React, { useEffect } from 'react';
import { AdminHeader } from '.';
import "../scss/component/_layout.scss";

const AdminLayout : React.FC = ({children}) => {
	// admin 페이지의 header와 페이지들의 공통요소를 포함하는 틀

	return (
		<div id="wrap">
			<div id="content-width-wrap">
				<AdminHeader/>
				<div id="content-wrap">
					{children}
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;