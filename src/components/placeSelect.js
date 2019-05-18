import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import MenuItem from '@material-ui/core/MenuItem';
import universities from '../assets/universities.json';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
	},
}));

function PlaceSelect({ autoFocus, onChange = () => {}, value }) {
	const classes = useStyles();
	return (
		<FormControl variant="filled" className={classes.formControl}>
			<InputLabel>University</InputLabel>
			<Select
				autoFocus={autoFocus}
				value={value}
				onChange={onChange}
				input={<FilledInput />}>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				{universities.map((data, index) => (
					<MenuItem key={index} value={data.university}>
						{data.university}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

export default PlaceSelect;
