import React, { setGlobal } from 'reactn';
import { Router, Route } from 'react-router-dom';
import Layout from './components/layout';
import Login from './views/login';
import Register from './views/register';
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
		<Layout>
			<Router history={history}>
				<Route path="/" exact component={Login} />
				<Route path="/signup" component={Register} />
			</Router>
		</Layout>
	);
}

export default App;
