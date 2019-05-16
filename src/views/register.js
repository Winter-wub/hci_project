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
import ArrowRightButton from '../components/arrowRightButton';
import Checkbox from '../components/checkbox';
import GoBackButton from '../components/goBackButton';

function Register() {
	const [userInfo, setUserInfo] = useGlobal('userInfo');
	const [, setLogin] = useGlobal('isLogin');

	const [validator, setValidator] = useState({
		email: false,
		name: false,
		password: false,
	});

	const handleSignUp = () => {
		if (!Object.values(validator).includes(false)) {
			setLogin(true);
		} else {
			setLogin(false);
			alert('Email ชื่อ และรหัสผ่านไม่ถูกต้อง');
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
					actionComponent={<ArrowRightButton onClick={() => handleSignUp()} />}
					cardHeaderActionComponent={<GoBackButton />}>
					<GridView>
						<GridItem>
							<TextField
								error={!validator.name}
								label="Name"
								autoFocus
								IconComponent={<AccountIcon />}
								onChange={e => {
									validtion('name', e.target.value);
									setUserInfo({ ...userInfo, username: e.target.value });
								}}
							/>
						</GridItem>
						<GridItem>
							<TextField
								error={!validator.email}
								label="Email"
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
							<FacebookLoginButton />
						</GridItem>
						<GridItem>
							<GoogleLoginButton />
						</GridItem>
					</GridView>
				</Card>
			</GridItem>
		</GridView>
	);
}

export default Register;
