import React, { useGlobal, useState } from 'reactn';
import Validator from 'validator';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
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

	const handleUpdate = () => {
		if (!Object.values(validator).includes(false)) {
			history.push('/setup');
		} else {
			alert('Email ชื่อ และรหัสผ่านไม่ถูกต้อง');
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
							onClick={() => {
								if (step < 3) {
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
						onClick={() => {
							validation(0, '');
							setUserInfo({ ...userInfo, interestSex: 'female' });
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
							setUserInfo({ ...userInfo, interestSex: 'male' });
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
						<FormControl variant="filled" className={classes.formControl}>
							<InputLabel>University</InputLabel>
							<Select
								autoFocus
								value={userInfo.university}
								onChange={e => {
									validation(2, e.target.value);
									setUserInfo({ ...userInfo, university: e.target.value });
								}}
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
