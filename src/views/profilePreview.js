import React from 'reactn';
import TextFieldWithIcon from '../components/textFieldWithIcon';
import { GridItem, GridView } from '../components/grid';
import Card from '../components/card';
import GoBackButton from '../components/goBackButton';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(() => ({
	previewImage: {
		height: '150px',
		width: '150px',
		borderRadius: '50%',
	},
}));
function ProfilePreview({ match: { params } }) {
	const classes = useStyles();
	return (
		<GridView>
			<GridItem>
				<Card title="" cardHeaderActionComponent={<GoBackButton />}>
					<GridView>
						<GridItem>
							<GridView>
								<GridItem>
									<Avatar
										alt="Preview Display"
										// src={userInfo.display}
										className={classes.previewImage}
									/>
								</GridItem>
							</GridView>
						</GridItem>
						<GridItem>
							<TextFieldWithIcon
								label="Age"
								// value={userInfo.age}
								disabled
							/>
						</GridItem>
						<GridItem>
							<TextFieldWithIcon
								label="About me"
								// value={userInfo.bio}
								disabled
							/>
						</GridItem>
						<GridItem>
							<TextFieldWithIcon
								label="Job Title"
								// value={userInfo.jobTitle}
								disabled
							/>
						</GridItem>
						<GridItem>
							<TextFieldWithIcon
								label="Company"
								// value={userInfo.company}
								disabled
							/>
						</GridItem>
						<GridItem>
							<TextFieldWithIcon
								label="Email"
								// value={userInfo.company}
								disabled
							/>
						</GridItem>
					</GridView>
				</Card>
			</GridItem>
		</GridView>
	);
}

export default ProfilePreview;
