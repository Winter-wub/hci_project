import React, { setGlobal } from 'reactn';
import { Router, Route } from 'react-router-dom';
import Layout from './components/layout';
import Login from './views/login';
import Register from './views/register';
import profileMenu from './views/profileMenu';
import profileSettings from './views/profileEdit';
import Settings from './views/settings';
import Main from './views/main';
import Message from './views/chat';
import Profile from './views/profilePreview';
import history from './utils/history';

setGlobal({
	isLogin: false,
	id: '',
	userInfo: {
		sex: '',
		name: '',
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
		email: '',
	},
	message: [
		{
			userId: '121546456',
			name: 'wave',
		},
	],
});

function App() {
	return (
		<Layout>
			<Router history={history}>
				<Route path="/login" exact component={Login} />
				<Route path="/signup" component={Register} />
				<Route path="/setup" component={profileMenu} />
				<Route path="/edit" component={profileSettings} />
				<Route path="/setting" component={Settings} />
				<Route path="/" exact component={Main} />
				<Route path="/message" component={Message} />
				<Route path="/profile" component={Profile} />
			</Router>
		</Layout>
	);
}

export default App;
