import React, { useGlobal } from 'reactn';
import queryString from 'qs';
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
function ProfilePreview({ location: { search } }) {
	const classes = useStyles();
	const [message] = useGlobal('message');
	const qs = queryString.parse(search);
	const id = qs['?id'];
	console.log(message);
	const profileIndex = message.findIndex(msn => msn.id === id);
	const profile = message[profileIndex];
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
										src={profile.display}
										className={classes.previewImage}
									/>
								</GridItem>
							</GridView>
						</GridItem>
						<GridItem>
							<TextFieldWithIcon label="Age" value={profile.age} disabled />
						</GridItem>
						<GridItem>
							<TextFieldWithIcon label="Bio" value={profile.bio} disabled />
						</GridItem>
						<GridItem>
							<TextFieldWithIcon
								label="Job Title"
								value={profile.jobTitle}
								disabled
							/>
						</GridItem>
						<GridItem>
							<TextFieldWithIcon
								label="Company"
								value={profile.company}
								disabled
							/>
						</GridItem>
						<GridItem>
							<TextFieldWithIcon label="Email" value={profile.email} disabled />
						</GridItem>
						<GridItem>
							<TextFieldWithIcon label="Phone" value={profile.phone} disabled />
						</GridItem>
					</GridView>
				</Card>
			</GridItem>
		</GridView>
	);
}

export default ProfilePreview;
