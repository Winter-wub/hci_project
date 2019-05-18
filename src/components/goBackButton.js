import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import LeftArrowIcon from '@material-ui/icons/ArrowBack';
import history from '../utils/history';

function GobackButton({ disabled = false, action = () => history.goBack() }) {
	return (
		<IconButton disabled={disabled} onClick={action}>
			<LeftArrowIcon />
		</IconButton>
	);
}

export default GobackButton;
