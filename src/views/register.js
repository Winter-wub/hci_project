import React, { useGlobal, useState } from 'reactn';
import Validator from 'validator';
// import {
// 	FacebookLoginButton,
// 	GoogleLoginButton,
// } from 'react-social-login-buttons';
import AccountIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/EmailRounded';
import CakeIcon from '@material-ui/icons/Cake';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/Lock';
import { GridItem, GridView } from '../components/grid';
import Card from '../components/card';
import TextField from '../components/textFieldWithIcon';
import { ArrowRightButton } from '../components/arrow';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import MenuItem from '@material-ui/core/MenuItem';
import GoBackButton from '../components/goBackButton';
import history from '../utils/history';
import firebase from '../utils/firebase';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
	},
}));
const firestore = firebase.firestore();

function Register() {
	const classes = useStyles();
	const [userInfo, setUserInfo] = useGlobal('userInfo');
	const [, setLogin] = useGlobal('isLogin');

	const [validator, setValidator] = useState({
		email: false,
		name: false,
		password: false,
		age: true,
		sex: false,
	});

	const [dirty, setDirty] = useState(false);
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
				if (!Validator.isEmpty(value)) {
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
			case 'age': {
				if (value >= 18 && value <= 35) {
					setValidator({
						...validator,
						age: true,
					});
				} else {
					setValidator({
						...validator,
						age: false,
					});
				}
				break;
			}
			case 'sex': {
				setValidator({
					...validator,
					sex: true,
				});
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
									setDirty(true);
									validtion('email', e.target.value);
									setUserInfo({ ...userInfo, email: e.target.value });
								}}
							/>
							{dirty && !validator.email && <div>Invalid Email</div>}
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
							<TextField
								error={!validator.password}
								label="Age"
								type="number"
								value={userInfo.age}
								IconComponent={<CakeIcon />}
								onChange={e => {
									validtion('age', e.target.value);
									setUserInfo({
										...userInfo,
										age: parseInt(e.target.value, 10),
									});
								}}
							/>
							<Typography>{''}Age must be more than 18 Year Old</Typography>
						</GridItem>
						<GridItem>
							<FormControl variant="filled" className={classes.formControl}>
								<InputLabel>Sex</InputLabel>
								<Select
									value={userInfo.sex}
									onChange={e => {
										validtion('sex', e.target.value);
										setUserInfo({ ...userInfo, sex: e.target.value });
									}}
									input={<FilledInput />}>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									<MenuItem value="female">
										<em>Female</em>
									</MenuItem>
									<MenuItem value="male">
										<em>Male</em>
									</MenuItem>
								</Select>
							</FormControl>
						</GridItem>
					</GridView>
				</Card>
			</GridItem>
			{/* <GridItem>
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
			</GridItem> */}
		</GridView>
	);
}

export default Register;
