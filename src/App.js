import React, { setGlobal } from 'reactn';
import { Router, Route } from 'react-router-dom';
import Layout from './components/layout';
import Login from './views/login';
import history from './utils/history';

setGlobal({
	isLogin: false,
	userInfo: {
		username: '',
		password: '',
	},
});

function App() {
	return (
		<Router history={history}>
			<Layout>
				<Route path="/" component={Login} />
			</Layout>
		</Router>
	);
}

export default App;
