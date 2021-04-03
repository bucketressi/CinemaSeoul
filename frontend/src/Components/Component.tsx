import React from 'react';
import { Grid } from '@material-ui/core';
import { useStringState } from '../Main/Model/PracticeModel';
import { useChangeString } from '../Main/ViewModel';

const Component = () => {
	const string = useStringState();
	const changeString = useChangeString();
	return(
		<>
			<Grid className="component-wrap">component</Grid>
			<Grid>{string}</Grid>
			<button onClick={() => changeString(string + " change")}>click to change string</button>
		</>
	);
}

export default Component;
