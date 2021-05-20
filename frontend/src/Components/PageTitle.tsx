import React from 'react';
import "../scss/component/_pagetitle.scss";

type Props = {
	title : string;
}

const PageTitle = ({title} : Props) => (
	<div className="page-title">
		{title}
	</div>
);

export default PageTitle;