import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Provider from './Main/Provider';

function App() {
	return (
		<BrowserRouter>
			<Provider />
		</BrowserRouter>
	);
}

export default App;
