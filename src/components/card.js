import React from 'react';
import { makeStyles } from '@material-ui/styles/';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles(theme => ({
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
}));

function CardComponent({ children, actionComponent }) {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<CardContent>{children}</CardContent>
			<CardActions className={classes.cardActions}>
				{actionComponent}
			</CardActions>
		</Card>
	);
}

export default CardComponent;
