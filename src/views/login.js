import React, { useGlobal, useState } from 'reactn';
import Validator from 'validator';
import { makeStyles } from '@material-ui/styles/';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { GridView, GridItem } from '../components/grid';
import Card from '../components/card';
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
					actionComponent={
						<Fab color="primary" onClick={() => handleSignIn()}>
							<ArrowForwardIcon fontSize="default" />
						</Fab>
					}>
					<GridView>
						<GridItem>
							<Typography variant="h5" component="h3">
								Sign In
							</Typography>
						</GridItem>
						<GridItem>
							<TextField
								error={!validator.username}
								className={classes.textField}
								margin="normal"
								label="Email"
								type="email"
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
							<Button
								variant="text"
								color="secondary"
								onClick={() => handleForgetPassword()}>
								Forgot Password!
							</Button>
						</GridItem>
					</GridView>
				</Card>
			</GridItem>
			<GridItem>
				<Card>
					<GridView>
						<GridItem>
							<Typography variant="h5" component="h5">
								Or
							</Typography>
						</GridItem>
						<GridItem>
							<Fab variant="extended" margin="normal">
								Continue with Facebook
							</Fab>
						</GridItem>
						<GridItem>
							<Fab variant="extended" margin="normal">
								Continue with Google
							</Fab>
						</GridItem>
						<GridItem>
							<Button
								variant="text"
								color="secondary"
								onClick={() => history.push('/signup')}>
								Sign Up
							</Button>
						</GridItem>
					</GridView>
				</Card>
			</GridItem>
		</GridView>
	);
}

export default Login;
