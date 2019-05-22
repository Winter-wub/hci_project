import React, { useGlobal } from 'reactn';
import queryString from 'qs';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmenIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { GridItem, GridView } from '../components/grid';
import Card from '../components/card';
import GoBackButton from '../components/goBackButton';
import Setup from './setup';
import history from '../utils/history';

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
	AppBar: {
		background: theme.palette.primary.mainGradient,
		color: 'white',
	},
}));

function ProfileEditor() {
	const [userInfo, setUserInfo] = useGlobal('userInfo');
	const classes = useStyles();
	const [, setIslogin] = useGlobal('isLogin');

	return (
		<GridView>
			<GridItem>
				<GridView>
					<AppBar position="static" color="default" className={classes.AppBar}>
						<Toolbar>
							<GridView direction="row" justify="flex-start">
								<GridItem>
									<GoBackButton action={() => history.push('/')} />
								</GridItem>
								<GridItem>
									<Typography variant="h6" color="inherit">
										Profile
									</Typography>
								</GridItem>
							</GridView>
						</Toolbar>
						<GridView>
							<GridItem>
								<Avatar
									alt="Preview Display"
									src={userInfo.display}
									className={classes.previewImage}
								/>
							</GridItem>
							<GridItem>
								<Typography variant="h5">
									{userInfo.name}({userInfo.age})
								</Typography>
							</GridItem>
							<GridItem>
								<Typography variant="h6" component="p">
									{userInfo.bio}
								</Typography>
							</GridItem>
							<GridItem>
								<GridView direction="row">
									<GridItem>
										<Button
											color="primary"
											variant="contained"
											onClick={() => history.push('/edit')}>
											<PersonIcon />
											Edit Profile
										</Button>
									</GridItem>
									<GridItem>
										<Button
											color="primary"
											variant="contained"
											onClick={() => history.push('/setting')}>
											<SettingsIcon /> Settings
										</Button>
									</GridItem>
								</GridView>
							</GridItem>
						</GridView>
						<GridView />
					</AppBar>
					<Card disabledHeader={false}>
						<List component="nav">
							<ListItem button>
								<ListItemIcon>
									<AssignmenIcon />
								</ListItemIcon>
								<ListItemText primary="ข้อตกลงการใช้งาน" />
							</ListItem>
							<ListItem button>
								<ListItemIcon>
									<ExitToAppIcon />
								</ListItemIcon>
								<ListItemText
									primary="ออกจากระบบ"
									onClick={() => {
										setIslogin(false);
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
									}}
								/>
							</ListItem>
						</List>
					</Card>
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
			return <Setup />;
		default:
			return <ProfileEditor />;
	}
}

export default ProfileEdit;
