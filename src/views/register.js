import React, { useGlobal, useState } from 'reactn';
import Validator from 'validator';
import {
	FacebookLoginButton,
	GoogleLoginButton,
} from 'react-social-login-buttons';
import AccountIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/EmailRounded';
import LockIcon from '@material-ui/icons/Lock';
import { GridItem, GridView } from '../components/grid';
import Card from '../components/card';
import TextField from '../components/textFieldWithIcon';
import { ArrowRightButton } from '../components/arrow';
import Checkbox from '../components/checkbox';
import GoBackButton from '../components/goBackButton';
import history from '../utils/history';
import firebase from '../utils/firebase';
const firestore = firebase.firestore();

function Register() {
	const [userInfo, setUserInfo] = useGlobal('userInfo');
	const [, setLogin] = useGlobal('isLogin');

	const [validator, setValidator] = useState({
		email: false,
		name: false,
		password: false,
	});

	const isExistsEmail = async () => {
		const docs = await firestore
			.collection('Users')
			.where('email', '==', userInfo.email)
			.get();
		return docs.size > 0 ? false : true;
	};

	const handleSignUp = async () => {
		if ((await isExistsEmail()) && !Object.values(validator).includes(false)) {
			setLogin(true);
			history.push('/setup?mode=first');
		} else {
			setLogin(false);
			alert('Email ชื่อ และรหัสผ่านไม่ถูกต้อง หรือ Email ใช้งานไปแล้ว');
		}
	};

	const validtion = (key, value) => {
		switch (key) {
			case 'name': {
				if (!Validator.isEmpty(value)) {
					setValidator({
						...validator,
						name: true,
					});
				} else {
					setValidator({
						...validator,
						name: false,
					});
				}
				break;
			}
			case 'email': {
				if (Validator.isEmail(value)) {
					setValidator({
						...validator,
						email: true,
					});
				} else {
					setValidator({
						...validator,
						email: false,
					});
				}
				break;
			}
			case 'password': {
				if (!Validator.isEmail(value)) {
					setValidator({
						...validator,
						password: true,
					});
				} else {
					setValidator({
						...validator,
						password: false,
					});
				}
				break;
			}
			default:
				break;
		}
	};

	return (
		<GridView>
			<GridItem>
				<Card
					title="Sign Up"
					actionComponent={
						<ArrowRightButton onClick={async () => await handleSignUp()} />
					}
					cardHeaderActionComponent={<GoBackButton />}>
					<GridView>
						<GridItem>
							<TextField
								error={!validator.name}
								label="Name"
								autoFocus
								value={userInfo.name}
								IconComponent={<AccountIcon />}
								onChange={e => {
									validtion('name', e.target.value);
									setUserInfo({ ...userInfo, name: e.target.value });
								}}
							/>
						</GridItem>
						<GridItem>
							<TextField
								error={!validator.email}
								label="Email"
								value={userInfo.email}
								IconComponent={<EmailIcon />}
								onChange={e => {
									validtion('email', e.target.value);
									setUserInfo({ ...userInfo, email: e.target.value });
								}}
							/>
						</GridItem>
						<GridItem>
							<TextField
								error={!validator.password}
								type="password"
								label="Password"
								value={userInfo.password}
								IconComponent={<LockIcon />}
								onChange={e => {
									validtion('password', e.target.value);
									setUserInfo({ ...userInfo, password: e.target.value });
								}}
							/>
						</GridItem>
						<GridItem>
							<Checkbox label="Agree Term of Services" />
						</GridItem>
					</GridView>
				</Card>
			</GridItem>
			<GridItem>
				<Card title="Or">
					<GridView>
						<GridItem>
							<FacebookLoginButton onClick={() => alert('Coming soon')} />
						</GridItem>
						<GridItem>
							<GoogleLoginButton onClick={() => alert('Coming soon')} />
						</GridItem>
					</GridView>
				</Card>
			</GridItem>
		</GridView>
	);
}

export default Register;
