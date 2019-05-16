import React, { useGlobal, useState } from 'reactn';
import Validator from 'validator';
import { makeStyles } from '@material-ui/styles/';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
	FacebookLoginButton,
	GoogleLoginButton,
} from 'react-social-login-buttons';
import { GridView, GridItem } from '../components/grid';
import Card from '../components/card';
import ArrowRightButton from '../components/arrowRightButton';
import history from '../utils/history';

const useStyles = makeStyles(theme => ({
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
}));

function Login() {
	const classes = useStyles();
	const [userInfo, setUserInfo] = useGlobal('userInfo');
	const [, setLogin] = useGlobal('isLogin');
	const [validator, setValidator] = useState({
		username: false,
		password: false,
	});

	const checkValidationField = (key, value) => {
		switch (key) {
			case 'email': {
				Validator.isEmail(value)
					? setValidator({ ...validator, username: true })
					: setValidator({ ...validator, username: false });
				break;
			}
			case 'password': {
				!Validator.isEmpty(value)
					? setValidator({ ...validator, password: true })
					: setValidator({ ...validator, password: false });
				break;
			}
			default:
				break;
		}
	};

	const handleSignIn = () => {
		if (!Object.values(validator).includes(false)) {
			setLogin(true);
		} else {
			setLogin(false);
			alert('Email หรือ รหัสผ่านไม่ถูกต้อง');
		}
	};

	const handleForgetPassword = () => {
		prompt('กรอกอีเมล์เพื่อกู็คืนรหัสผ่าน');
	};

	return (
		<GridView>
			<GridItem>
				<Card
					title="Sign In"
					actionComponent={<ArrowRightButton onClick={() => handleSignIn()} />}>
					<GridView>
						<GridItem>
							<TextField
								variant="outlined"
								error={!validator.username}
								className={classes.textField}
								margin="normal"
								label="Email"
								type="email"
								autoFocus
								value={userInfo.username}
								onChange={e => {
									setUserInfo({
										...userInfo,
										username: e.target.value,
									});
									checkValidationField('email', e.target.value);
								}}
							/>
						</GridItem>
						<GridItem>
							<TextField
								variant="outlined"
								error={!validator.password}
								className={classes.textField}
								margin="normal"
								label="Password"
								type="password"
								value={userInfo.password}
								onChange={e => {
									setUserInfo({
										...userInfo,
										password: e.target.value,
									});
									checkValidationField('password', e.target.value);
								}}
							/>
						</GridItem>
						<GridItem>
							<Button onClick={() => handleForgetPassword()}>
								Forgot Password!
							</Button>
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
						<GridItem>
							<Button onClick={() => history.push('/signup')}>Sign Up</Button>
						</GridItem>
					</GridView>
				</Card>
			</GridItem>
		</GridView>
	);
}

export default Login;
