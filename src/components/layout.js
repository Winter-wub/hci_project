import React from 'react';
import { makeStyles, ThemeProvider, install } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography: { useNextVariants: true },
});

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: '50px',
		flexGrow: 1,
	},
	app: {
		background: '#FF5252',
	},
}));

function Layout({ children }) {
	install();
	const classes = useStyles();
	return (
		<div className={classes.app}>
			<ThemeProvider theme={theme}>
				<div className={classes.root}>{children}</div>
			</ThemeProvider>
		</div>
	);
}

export default Layout;
