import React, { useGlobal, useState } from 'reactn';
// import Validator from 'validator';
import { makeStyles } from '@material-ui/styles';
import queryString from 'qs';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import MenuItem from '@material-ui/core/MenuItem';
import { GridItem, GridView } from '../components/grid';
import Card from '../components/card';
import GoBackButton from '../components/goBackButton';
import { ArrowRightButton, ArrowLeftButton } from '../components/arrow';
import history from '../utils/history';
import universities from '../assets/universities.json';

const useStyles = makeStyles(theme => ({
	button: {
		width: '200px',
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
	},
	previewImage: {
		height: '150px',
		width: '150px',
		borderRadius: '50%',
	},
}));

function FirstTimeEdit() {
	const classes = useStyles();
	const [step, setStep] = useState(1);
	const [userInfo, setUserInfo] = useGlobal('userInfo');

	// const [validator, setValidator] = useState({
	// 	sex: false,
	// 	name: false,
	// 	university: false,
	// 	display: false,
	// });

	const handleUpdate = () => {
		// if (!Object.values(validator).includes(false)) {
		history.push('/edit');
		// } else {
		// 	alert('Email ชื่อ และรหัสผ่านไม่ถูกต้อง');
		// }
	};

	// const validation = (key, value) => {
	// 	switch (key) {
	// 		case 1: {
	// 			if (userInfo.sex) {
	// 				setValidator({
	// 					...validator,
	// 					sex: true,
	// 				});
	// 			} else {
	// 				setValidator({
	// 					...validator,
	// 					sex: false,
	// 				});
	// 			}
	// 			break;
	// 		}
	// 		case 2: {
	// 			if (
	// 				Validator.isLength(value, {
	// 					key1: { length: { is: 10 } },
	// 					key2: {
	// 						length: { minimum: 10 },
	// 						key3: { length: { maximum: 10 } },
	// 					},
	// 				})
	// 			) {
	// 				setValidator({
	// 					...validator,
	// 					email: true,
	// 				});
	// 			} else {
	// 				setValidator({
	// 					...validator,
	// 					email: false,
	// 				});
	// 			}
	// 			break;
	// 		}
	// 		case 3: {
	// 			if (!Validator.isEmpty(value)) {
	// 				setValidator({
	// 					...validator,
	// 					password: true,
	// 				});
	// 			} else {
	// 				setValidator({
	// 					...validator,
	// 					password: false,
	// 				});
	// 			}
	// 			break;
	// 		}
	// 		case 4: {
	// 			if (!Validator.isEmpty(value)) {
	// 				setValidator({
	// 					...validator,
	// 					password: true,
	// 				});
	// 			} else {
	// 				setValidator({
	// 					...validator,
	// 					password: false,
	// 				});
	// 			}
	// 			break;
	// 		}
	// 		default:
	// 			break;
	// 	}
	// };

	const CardModify = ({ title, children }) => (
		<Card
			cardHeaderActionComponent={<GoBackButton />}
			actionComponent={
				<GridView direction="row" spacing={8}>
					<GridItem>
						<ArrowLeftButton
							disabled={step === 1}
							onClick={() => setStep(step - 1)}
						/>
					</GridItem>
					<GridItem>
						<ArrowRightButton
							onClick={() => {
								if (step < 4) {
									setStep(step + 1);
								} else {
									handleUpdate();
								}
							}}
						/>
					</GridItem>
				</GridView>
			}
			title={title}>
			{children}
		</Card>
	);

	const Sex = () => (
		<CardModify title="What are you looking for">
			<GridView>
				<GridItem>
					<Button
						className={classes.button}
						variant="contained"
						onClick={() => setUserInfo({ ...userInfo, sex: 'female' })}
						color={userInfo.sex === 'female' ? 'primary' : 'secondary'}>
						Woman
					</Button>
				</GridItem>
				<GridItem>
					<Button
						className={classes.button}
						variant="contained"
						onClick={() => setUserInfo({ ...userInfo, sex: 'male' })}
						color={userInfo.sex === 'male' ? 'primary' : 'secondary'}>
						Man
					</Button>
				</GridItem>
			</GridView>
		</CardModify>
	);

	const PhoneNumberEdit = () => (
		<CardModify
			title="Phone Number"
			cardHeaderActionComponent={<GoBackButton />}>
			<GridView>
				<GridItem>
					<TextField
						autoFocus
						label="Phone no."
						value={userInfo.phone}
						onChange={e => setUserInfo({ ...userInfo, phone: e.target.value })}
						variant="outlined"
					/>
				</GridItem>
			</GridView>
		</CardModify>
	);

	const UniversityEdit = () => {
		return (
			<CardModify
				title="University"
				cardHeaderActionComponent={<GoBackButton />}>
				<GridView>
					<GridItem>
						<FormControl variant="filled" className={classes.formControl}>
							<InputLabel>University</InputLabel>
							<Select
								autoFocus
								value={userInfo.university}
								onChange={e =>
									setUserInfo({ ...userInfo, university: e.target.value })
								}
								input={<FilledInput />}>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{universities.map((data, index) => (
									<MenuItem key={index} value={data.university}>
										{data.university}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</GridItem>
				</GridView>
			</CardModify>
		);
	};

	const PictureChoose = () => {
		return (
			<CardModify
				title="Show your face"
				cardHeaderActionComponent={<GoBackButton />}>
				<GridView>
					<GridItem>
						{userInfo.display.length <= 0 && (
							<input
								accept="image/*"
								type="file"
								onChange={e => {
									const reader = new FileReader();
									reader.readAsDataURL(e.target.files[0]);
									reader.onloadend = function(e) {
										setUserInfo({ ...userInfo, display: reader.result });
									};
								}}
							/>
						)}
						{userInfo.display && (
							<GridView>
								<GridItem>
									<img
										className={classes.previewImage}
										src={userInfo.display}
										alt=""
									/>
								</GridItem>
								<GridItem>
									<Button color="primary">Change</Button>
								</GridItem>
							</GridView>
						)}
					</GridItem>
				</GridView>
			</CardModify>
		);
	};

	return (
		<GridView>
			<GridItem>
				<GridView>
					{step === 1 && <Sex />}
					{step === 2 && <PhoneNumberEdit />}
					{step === 3 && <UniversityEdit />}
					{step === 4 && <PictureChoose />}
				</GridView>
			</GridItem>
		</GridView>
	);
}

function ProfileEditor() {
	return (
		<GridView>
			<GridItem>
				<GridView>
					<Card />
				</GridView>
			</GridItem>
		</GridView>
	);
}

function ProfileEdit({ location: { search } }) {
	const qs = queryString.parse(search);
	const mode = qs['?mode'];
	switch (mode) {
		case 'first':
			return <FirstTimeEdit />;
		default:
			return <ProfileEditor />;
	}
}

export default ProfileEdit;
