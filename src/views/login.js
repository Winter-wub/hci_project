import React, { useGlobal, useState } from 'reactn';
import Validator from 'validator';
import { makeStyles } from '@material-ui/styles/';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	card: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
		minWidth: 500,
		width: '600px',
	},
	cardActions: {
		float: 'right',
	},
	root: {
		flexGrow: 1,
	},
	gridItem: {
		Width: '500px',
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

	return (
		<div className={classes.root}>
			<Grid
				container
				direction="column"
				alignItems="center"
				spacing={16}
				justify="center">
				<Grid xs={12} className={classes.gridItem} item>
					<Card className={classes.card}>
						<CardContent>
							<Grid
								container
								spacing={16}
								alignContent="center"
								direction="column">
								<Grid item>
									<Typography variant="h5" component="h3">
										Sign In
									</Typography>
								</Grid>
								<Grid item>
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
								</Grid>
								<Grid item>
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
								</Grid>
								<Grid item>
									<Button variant="text" color="secondary">
										Forgot Password!
									</Button>
								</Grid>
							</Grid>
						</CardContent>
						<CardActions className={classes.cardActions}>
							<Fab color="primary" onClick={() => handleSignIn()}>
								<ArrowForwardIcon fontSize="default" />
							</Fab>
						</CardActions>
					</Card>
				</Grid>
				<Grid xs={12} className={classes.gridItem} item>
					<Card className={classes.card}>
						<CardContent>
							<Grid
								container
								spacing={16}
								alignContent="center"
								direction="column">
								<Grid item>
									<Typography variant="h5" component="h5">
										Or
									</Typography>
								</Grid>
								<Grid item>
									<Fab variant="extended" margin="normal">
										Continue with Facebook
									</Fab>
								</Grid>
								<Grid item>
									<Fab variant="extended" margin="normal">
										Continue with Google
									</Fab>
								</Grid>
								<Grid item>
									<Fab variant="extended" color="secondary" margin="normal">
										Sign Up
									</Fab>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
}

export default Login;
