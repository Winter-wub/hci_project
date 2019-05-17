import React from 'react';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/styles/';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
	button: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		border: 0,
		borderRadius: '50%',
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 60,
		padding: '0 30px',
	},
	icon: {
		color: 'white',
	},
	buttonDisable: {
		background:
			'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)',
		border: 0,
		borderRadius: '50%',
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 60,
		padding: '0 30px',
	},
}));

function ArrowRightButton({ onClick = () => {}, disabled = false }) {
	const classes = useStyles();
	return (
		<Fab
			disabled={disabled}
			className={!disabled ? classes.button : classes.buttonDisable}
			onClick={onClick}>
			<ArrowForwardIcon className={classes.icon} fontSize="default" />
		</Fab>
	);
}

function ArrowLeftButton({ onClick = () => {}, disabled = false }) {
	const classes = useStyles();
	return (
		<Fab
			disabled={disabled}
			className={!disabled ? classes.button : classes.buttonDisable}
			onClick={onClick}>
			<ArrowBackIcon className={classes.icon} fontSize="default" />
		</Fab>
	);
}

export { ArrowRightButton, ArrowLeftButton };
