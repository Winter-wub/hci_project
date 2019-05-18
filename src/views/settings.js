import React, { useGlobal, useState } from 'reactn';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Validator from 'validator';
import history from '../utils/history';
import TextFieldWithIcon from '../components/textFieldWithIcon';
import { GridItem, GridView } from '../components/grid';
import Card from '../components/card';
import GoBackButton from '../components/goBackButton';
import PlaceSelect from '../components/placeSelect';

const useStyles = makeStyles(theme => ({
	distance: {
		width: '200px',
	},
}));

function Settings() {
	const [userInfo, setUserInfo] = useGlobal('userInfo');
	const [isDirty, setDirty] = useState(false);
	const [validator, setValidator] = useState({
		phone: false,
	});

	const validation = (key, value) => {
		switch (key) {
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
			default:
				break;
		}
	};

	const classes = useStyles();

	return (
		<GridView>
			<GridItem>
				<Card
					title="Account Settings"
					cardHeaderActionComponent={
						<GoBackButton
							disabled={isDirty && Object.values(validator).includes(false)}
							onChange={() => {
								history.push('/setup');
							}}
						/>
					}>
					<GridView>
						<GridItem>
							<TextFieldWithIcon
								error={!validator.phone && isDirty}
								label="Phone"
								value={userInfo.phone}
								onChange={e => {
									setDirty(true);
									validation(1, e.target.value);
									setUserInfo({ ...userInfo, phone: e.target.value });
								}}
							/>
						</GridItem>
						<GridItem>
							<GridView>
								<GridItem>
									<Typography>การตั้งค่าการค้นพบ (กม.)</Typography>
								</GridItem>
								<GridItem>
									<GridView>
										<GridItem>{userInfo.distance}</GridItem>
										<GridItem>
											<Slider
												className={classes.distance}
												value={userInfo.distance}
												min={0}
												max={15}
												step={1}
												onChange={(e, value) =>
													setUserInfo({ ...userInfo, distance: value })
												}
											/>
										</GridItem>
									</GridView>
								</GridItem>
							</GridView>
						</GridItem>
						<GridItem>
							<GridView>
								<GridItem>
									<Typography>อายุ</Typography>
								</GridItem>
								<GridItem>
									<GridView>
										<GridItem>{userInfo.interestAge}</GridItem>
										<GridItem>
											<Slider
												className={classes.distance}
												value={userInfo.interestAge}
												min={20}
												max={35}
												step={1}
												onChange={(e, value) =>
													setUserInfo({ ...userInfo, interestAge: value })
												}
											/>
										</GridItem>
									</GridView>
								</GridItem>
							</GridView>
						</GridItem>
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
				</Card>
			</GridItem>
		</GridView>
	);
}

export default Settings;
