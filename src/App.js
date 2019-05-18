import React, { setGlobal } from 'reactn';
import { Router, Route } from 'react-router-dom';
import Layout from './components/layout';
import Login from './views/login';
import Register from './views/register';
import profileMenu from './views/profileMenu';
import profileSettings from './views/profileEdit';
import Settings from './views/settings';
import history from './utils/history';

setGlobal({
	isLogin: false,
	userInfo: {
		username: '',
		password: '',
		interestSex: '',
		university: '-',
		phone: '',
		display: '',
		age: 20,
		bio: '',
		jobTitle: '',
		company: '',
		distance: 5,
		interestAge: 20,
	},
});

function App() {
	return (
		<Layout>
			<Router history={history}>
				<Route path="/" exact component={Login} />
				<Route path="/signup" component={Register} />
				<Route path="/setup" component={profileMenu} />
				<Route path="/edit" component={profileSettings} />
				<Route path="/setting" component={Settings} />
			</Router>
		</Layout>
	);
}

export default App;
