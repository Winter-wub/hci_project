import React from 'reactn';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography: { useNextVariants: true },
});

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: '50px',
	},
}));

function Layout({ children }) {
	const classes = useStyles();
	return (
		<ThemeProvider theme={theme}>
			<div className={classes.root}>{children}</div>
		</ThemeProvider>
	);
}

export default Layout;
