import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/styles/';
const useStyles = makeStyles(theme => ({
	checkbox: {
		color: 'white',
	},
	'&$checked': {
		color: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
	},
}));
function CheckboxComponent({
	label = '',
	checked,
	onChange = () => {},
	value,
}) {
	const classes = useStyles();
	return (
		<FormControlLabel
			control={
				<Checkbox
					className={{
						root: classes.checkbox,
						checked: classes.checked,
					}}
					checked={checked}
					onChange={onChange}
					value={value}
					label={label}
				/>
			}
			label={label}
		/>
	);
}

export default CheckboxComponent;
