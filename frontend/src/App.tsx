import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Provider from './Main/Provider';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
const theme = unstable_createMuiStrictModeTheme();

function App() {
	return (
		<ThemeProvider theme = {theme}>
			<BrowserRouter>
				<Provider />
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
