import React from 'react';
import { Header } from '.';
import "../scss/component/_layout.scss";

const Layout : React.FC = ({children}) => {
	// user 페이지의 header와 페이지들의 공통요소를 포함하는 틀
	return (
		<div id="wrap">
			<div id="content-width-wrap">
				<Header/>
				<div id="content-wrap">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Layout;