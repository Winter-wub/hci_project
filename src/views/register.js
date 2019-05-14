import React, { useGlobal, useState } from 'reactn';
import Validator from 'validator';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AccountIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/EmailRounded';
import LockIcon from '@material-ui/icons/Lock';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { GridItem, GridView } from '../components/grid';
import Card from '../components/card';
import TextField from '../components/textFieldWithIcon';

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
					actionComponent={
						<Fab color="primary">
							<ArrowForwardIcon
								fontSize="default"
								onClick={() => handleSignUp()}
							/>
						</Fab>
					}>
					<Typography variant="h5" component="h3">
						Sign Up
					</Typography>
					<TextField
						error={!validator.name}
						label="Name"
						IconComponent={<AccountIcon />}
						onChange={e => {
							validtion('name', e.target.value);
							setUserInfo({ ...userInfo, username: e.target.value });
						}}
					/>
					<TextField
						error={!validator.email}
						label="Email"
						IconComponent={<EmailIcon />}
						onChange={e => {
							validtion('email', e.target.value);
							setUserInfo({ ...userInfo, email: e.target.value });
						}}
					/>
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
				</Card>
			</GridItem>
			<GridItem>
				<Card>
					<GridView>
						<GridItem>
							<Typography variant="h5" component="h3">
								Or
							</Typography>
						</GridItem>
						<GridItem>
							<Fab variant="extended" margin="normal">
								Sign Up with Google
							</Fab>
						</GridItem>
						<GridItem>
							<Fab variant="extended" margin="normal">
								Sign Up with Facebook
							</Fab>
						</GridItem>
					</GridView>
				</Card>
			</GridItem>
		</GridView>
	);
}

export default Register;
