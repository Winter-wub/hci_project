import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function TextFieldWithIcon({
	IconComponent,
	label,
	error,
	type,
	onChange = () => {},
	variant = 'outlined',
	autoFocus,
	value,
	disabled,
}) {
	return (
		<div>
			<Grid container spacing={8} alignItems="center">
				<Grid item>{IconComponent}</Grid>
				<Grid item>
					<TextField
						autoFocus={autoFocus}
						error={error}
						onChange={onChange}
						label={label}
						type={type}
						variant={variant}
						value={value}
						disabled={disabled}
					/>
				</Grid>
			</Grid>
		</div>
	);
}

export default TextFieldWithIcon;
