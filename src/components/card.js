import React from 'react';
import { makeStyles } from '@material-ui/styles/';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	card: {
		paddingBottom: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
		minWidth: 500,
		width: '600px',
		background: '#eeeeee',
	},
	cardActions: {
		float: 'right',
		padding: theme.spacing.unit * 2,
	},
}));

function CardComponent({
	children,
	actionComponent,
	cardHeaderActionComponent,
	title = '',
	titlejustify = 'flex-start',
	titleAlignItems = 'center',
	disabledHeader = 'false',
}) {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			{disabledHeader && (
				<AppBar position="static" color="default">
					<Toolbar>
						<Grid
							container
							direction="row"
							spacing={8}
							justify={titlejustify}
							alignItems={titleAlignItems}>
							<Grid item>{cardHeaderActionComponent}</Grid>
							<Grid item>
								<Typography variant="h6" color="inherit">
									{title}
								</Typography>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			)}
			<CardContent>{children}</CardContent>
			<CardActions className={classes.cardActions}>
				{actionComponent}
			</CardActions>
		</Card>
	);
}

export default CardComponent;
