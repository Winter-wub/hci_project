import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles/';

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing.unit,
	},
}));

function TextFieldWithIcon({
	IconComponent,
	label,
	error,
	type,
	onChange = () => {},
	variant="outlined"
}) {
	const classes = useStyles();
	return (
		<div className={classes.margin}>
			<Grid container spacing={16} alignItems="center" justify="center">
				<Grid item>{IconComponent}</Grid>
				<Grid item>
					<TextField
						error={error}
						onChange={onChange}
						label={label}
						type={type}
						variant={variant}
					/>
				</Grid>
			</Grid>
		</div>
	);
}

export default TextFieldWithIcon;
