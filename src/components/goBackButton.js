import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import LeftArrowIcon from '@material-ui/icons/ArrowBack';
import history from '../utils/history';
function GobackButton() {
	return (
		<IconButton onClick={() => history.goBack()}>
			<LeftArrowIcon />
		</IconButton>
	);
}

export default GobackButton;
