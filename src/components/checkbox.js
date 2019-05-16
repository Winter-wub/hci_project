import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function CheckboxComponent({
	label = '',
	checked,
	onChange = () => {},
	value,
}) {
	
	return (
		<FormControlLabel
			control={
				<Checkbox
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
