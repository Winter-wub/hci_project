import React from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/styles/';

const useStyles = makeStyles(theme => ({
	GridItem: {
		boxShadow: '25',
	},
}));

const GridView = ({
	children,
	spacing = 16,
	justify = 'center',
	alignItems = 'center',
	direction = 'column',
}) => {
	return (
		<Grid
			container
			direction={direction}
			alignItems={alignItems}
			spacing={spacing}
			justify={justify}>
			{children}
		</Grid>
	);
};

const GridItem = ({ children, xs }) => {
	const classes = useStyles();
	return (
		<Grid className={classes.GridItem} xs={xs} item>
			{children}
		</Grid>
	);
};
export { GridView, GridItem };
