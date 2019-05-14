import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles/';

const useStyles = makeStyles(theme => ({
	gridItem: {
		Width: '500px',
	},
}));
const GridView = ({ children }) => {
	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			spacing={16}
			justify="center">
			{children}
		</Grid>
	);
};

const GridItem = ({ children }) => {
	const classes = useStyles();

	return (
		<Grid xs={12} className={classes.gridItem} item>
			{children}
		</Grid>
	);
};
export { GridView, GridItem };
