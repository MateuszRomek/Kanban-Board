import React from 'react';

import { Switch, Route } from 'react-router-dom';

import TableLayout from './containers/TableLayout/TableLayout';
import BoardsCreator from './containers/BoardCreator/BoardCreator';

function App() {
	return (
		<Switch>
			<Route path="/boards" component={TableLayout} />
			<Route path="/" component={BoardsCreator} />
		</Switch>
	);
}

export default App;
