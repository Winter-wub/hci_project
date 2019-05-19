import React, { useGlobal, useState } from 'reactn';
import Validator from 'validator';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { GridItem, GridView } from '../components/grid';
import Card from '../components/card';
import GoBackButton from '../components/goBackButton';
import { ArrowRightButton, ArrowLeftButton } from '../components/arrow';
import history from '../utils/history';
import PlaceSelect from '../components/placeSelect';
import firebase from '../utils/firebase';
import bcrypt from 'bcryptjs';

const firestore = firebase.firestore();
const storage = firebase.storage().ref();

const useStyles = makeStyles(theme => ({
	button: {
		width: '200px',
	},
	previewImage: {
		height: '150px',
		width: '150px',
		borderRadius: '50%',
	},
}));

function Setup() {
	const classes = useStyles();
	const [step, setStep] = useState(0);
	const [userInfo, setUserInfo] = useGlobal('userInfo');

	const [validator, setValidator] = useState({
		sex: false,
		phone: false,
		university: false,
		display: false,
	});

	const uploadDisplay = () => {
		return new Promise((resolve, reject) => {
			const displayRef = storage
				.child(userInfo.name)
				.putString(userInfo.display, 'data_url');

			displayRef.on(
				'state_changed',
				() => {},
				error => {
					reject(error);
				},
				() => {
					displayRef.snapshot.ref.getDownloadURL().then(function(downloadURL) {
						resolve(downloadURL);
					});
				},
			);
		});
	};

	const saveData = async () => {
		try {
			const displayUrl = await uploadDisplay();
			const salt = bcrypt.genSaltSync(8);
			const password = bcrypt.hashSync(userInfo.password, salt);
			await firestore.collection('Users').add({
				...userInfo,
				users_like: [],
				password: password,
				display: displayUrl,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async () => {
		if (!Object.values(validator).includes(false)) {
			await saveData();
			setUserInfo({
				name: '',
				username: '',
				password: '',
				interestSex: '',
				university: '-',
				phone: '',
				display: '',
				age: 0,
				bio: '',
				jobTitle: '',
				company: '',
				distance: 0,
				interestAge: 0,
				email: '',
			});
			history.push('/login');
		} else {
			alert('มีข้อมูลไม่ถูกต้องกรุณาตวจสอบอีกครั้ง');
		}
	};

	const validation = (key, value) => {
		switch (key) {
			case 0: {
				setValidator({
					...validator,
					sex: true,
				});
				break;
			}
			case 1: {
				if (
					Validator.isNumeric(value) &&
					Validator.isLength(value, { min: 10, max: 10 })
				) {
					setValidator({
						...validator,
						phone: true,
					});
				} else {
					setValidator({
						...validator,
						phone: false,
					});
				}
				break;
			}
			case 2: {
				if (!Validator.isEmpty(value)) {
					setValidator({
						...validator,
						university: true,
					});
				} else {
					setValidator({
						...validator,
						university: false,
					});
				}
				break;
			}
			case 3: {
				if (!Validator.isEmpty(value)) {
					setValidator({
						...validator,
						display: true,
					});
				} else {
					setValidator({
						...validator,
						display: false,
					});
				}
				break;
			}
			default:
				break;
		}
	};
	const CardModify = ({ title, children }) => (
		<Card
			cardHeaderActionComponent={<GoBackButton />}
			actionComponent={
				<GridView direction="row" spacing={8}>
					<GridItem>
						<ArrowLeftButton
							disabled={step === 0}
							onClick={() => setStep(step)}
						/>
					</GridItem>
					<GridItem>
						<ArrowRightButton
							disabled={!Object.values(validator)[step]}
							onClick={async () => {
								if (step < 3) {
									setStep(step + 1);
								} else {
									await handleUpdate();
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
						onClick={() => {
							validation(0, '');
							setUserInfo({ ...userInfo, interestSex: 'female', sex: 'male' });
						}}
						color={userInfo.interestSex === 'female' ? 'primary' : 'secondary'}>
						Woman
					</Button>
				</GridItem>
				<GridItem>
					<Button
						className={classes.button}
						variant="contained"
						onClick={() => {
							validation(0, '');
							setUserInfo({ ...userInfo, interestSex: 'male', sex: 'female' });
						}}
						color={userInfo.interestSex === 'male' ? 'primary' : 'secondary'}>
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
						onChange={e => {
							validation(1, e.target.value);
							setUserInfo({ ...userInfo, phone: e.target.value });
						}}
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
						<PlaceSelect
							autoFocus
							onChange={e => {
								validation(2, e.target.value);
								setUserInfo({ ...userInfo, university: e.target.value });
							}}
							value={userInfo.university}
						/>
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
						{!userInfo.display && (
							<input
								accept="image/*"
								type="file"
								onChange={e => {
									validation(3, e.target.value);
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
									<Avatar
										alt="Preview"
										src={userInfo.display}
										className={classes.previewImage}
									/>
								</GridItem>
								<GridItem>
									<Button
										color="primary"
										onClick={() => {
											setUserInfo({ ...userInfo, display: null });
											validation(3, '');
										}}>
										Change
									</Button>
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
					{step === 0 && <Sex />}
					{step === 1 && <PhoneNumberEdit />}
					{step === 2 && <UniversityEdit />}
					{step === 3 && <PictureChoose />}
				</GridView>
			</GridItem>
		</GridView>
	);
}

export default Setup;
