import React, { setGlobal } from 'reactn';
import { Router, Route } from 'react-router-dom';
import Layout from './components/layout';
import Login from './views/login';
import Register from './views/register';
import ProfileEdit from './views/profileEdit';
import history from './utils/history';

setGlobal({
	isLogin: false,
	userInfo: {
		username: 'Prachayawut Sirisuth',
		password: '',
		sex: '',
		university: '-',
		phone: '',
		display: '',
		age: 22,
		bio: '',
	},
});

function App() {
	return (
		<Layout>
			<Router history={history}>
				<Route path="/" exact component={Login} />
				<Route path="/signup" component={Register} />
				<Route path="/edit" component={ProfileEdit} />
			</Router>
		</Layout>
	);
}

export default App;
