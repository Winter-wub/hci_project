import React, { useGlobal, useState } from 'reactn';
import Button from '@material-ui/core/Button';
import history from '../utils/history';
import TextFieldWithIcon from '../components/textFieldWithIcon';
import { GridItem, GridView } from '../components/grid';
import Card from '../components/card';
import GoBackButton from '../components/goBackButton';
import Avatar from '../components/avatar';
import firebase from '../utils/firebase';
const firestore = firebase.firestore();
const storage = firebase.storage().ref();

function ProfileEdit() {
	const [isChangeDis, setIsChangeDis] = useState(false);
	const [id] = useGlobal('id');
	const [dirtyDis, setDirtyDis] = useState(false);
	const [userInfo, setUserInfo] = useGlobal('userInfo');

	const uploadDisplay = () => {
		return new Promise((resolve, reject) => {
			const displayRef = storage
				.child(id)
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
			if (dirtyDis) {
				const displayUrl = await uploadDisplay();
				await firestore
					.collection('Users')
					.doc(id)
					.set({
						...userInfo,
						display: displayUrl,
					});
			} else {
				await firestore
					.collection('Users')
					.doc(id)
					.set({
						...userInfo,
					});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<GridView>
			<GridItem>
				<Card
					title="Edit your profile"
					cardHeaderActionComponent={
						<GoBackButton
							action={async () => {
								saveData();
								history.push('/setup');
							}}
						/>
					}>
					<GridView>
						<GridItem>
							<GridView>
								<GridItem>
									<Avatar />
								</GridItem>
								<GridItem>
									{!isChangeDis && (
										<Button
											color="primary"
											onClick={() => setIsChangeDis(true)}>
											Change Display
										</Button>
									)}
									{isChangeDis && (
										<React.Fragment>
											<input
												accept="image/*"
												type="file"
												onChange={e => {
													const reader = new FileReader();
													reader.readAsDataURL(e.target.files[0]);
													reader.onloadend = function(e) {
														setUserInfo({
															...userInfo,
															display: reader.result,
														});
													};
													setDirtyDis(true);
													setIsChangeDis(false);
												}}
											/>
											<Button
												color="primary"
												onClick={() => setIsChangeDis(false)}>
												Cancel
											</Button>
										</React.Fragment>
									)}
								</GridItem>
							</GridView>
						</GridItem>
						<GridItem>
							<TextFieldWithIcon
								label="Age"
								value={userInfo.age}
								onChange={e =>
									setUserInfo({
										...userInfo,
										age: parseInt(e.target.value, 10),
									})
								}
							/>
						</GridItem>
						<GridItem>
							<TextFieldWithIcon
								label="About me"
								value={userInfo.bio}
								onChange={e =>
									setUserInfo({ ...userInfo, bio: e.target.value })
								}
							/>
						</GridItem>
						<GridItem>
							<TextFieldWithIcon
								label="Job Title"
								value={userInfo.jobTitle}
								onChange={e =>
									setUserInfo({ ...userInfo, jobTitle: e.target.value })
								}
							/>
						</GridItem>
						<GridItem>
							<TextFieldWithIcon
								label="Company"
								value={userInfo.company}
								onChange={e =>
									setUserInfo({ ...userInfo, company: e.target.value })
								}
							/>
						</GridItem>
					</GridView>
				</Card>
			</GridItem>
		</GridView>
	);
}

export default ProfileEdit;
