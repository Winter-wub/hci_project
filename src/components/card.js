import React from 'react';
import { makeStyles } from '@material-ui/styles/';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles(theme => ({
	card: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
		minWidth: 500,
		width: '600px',
		background: '#eeeeee',
	},
	cardActions: {
		float: 'right',
	},
	cardHeader: {
		action: {
			float: 'left',
		},
	},
}));

function CardComponent({
	children,
	actionComponent,
	cardHeaderActionComponent,
	title = '',
	subtitle = '',
}) {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<CardHeader
				className={classes.cardHeader}
				avatar={cardHeaderActionComponent}
				title={title}
				subheader={subtitle}
			/>
			<CardContent>{children}</CardContent>
			<CardActions className={classes.cardActions}>
				{actionComponent}
			</CardActions>
		</Card>
	);
}

export default CardComponent;
