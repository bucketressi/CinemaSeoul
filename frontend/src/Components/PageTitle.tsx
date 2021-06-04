import React from 'react';
import "../scss/component/_pagetitle.scss";

import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

type Props = {
	title : string; // 페이지 제목
	isButtonVisible : boolean; // 뒤로가기 버튼을 만들지 결정
	buttonFunction? : () => void; // 버튼에 대한 function 직접 설정
}

const PageTitle = ({title, isButtonVisible, buttonFunction} : Props) => {
	const history = useHistory();
	return (
		<div className="page-title">
			{
				isButtonVisible && <Button onClick={buttonFunction ? buttonFunction : () => history.goBack()} className="back-arrow"><ArrowBackIcon/></Button>
			}
			<div>
				{title}
			</div>
		</div>
	);
};

export default PageTitle;