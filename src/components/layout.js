import React from 'react';
import { makeStyles, ThemeProvider, install } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
install();

const theme = createMuiTheme({
	typography: { useNextVariants: true },
	palette: {
		primary: {
			main: '#ff5864',
			mainGradient: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		},
		secondary: { main: '#424242' },
		default: { main: '#FF655B' },
	},
});

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	app: {},
}));

function Layout({ children }) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<ThemeProvider theme={theme}>
				<div className={classes.root}>{children}</div>
			</ThemeProvider>
		</div>
	);
}

export default Layout;
