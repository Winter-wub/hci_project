import React, { useGlobal } from 'reactn';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(() => ({
	previewImage: {
		height: '150px',
		width: '150px',
		borderRadius: '50%',
	},
}));

function AvatarComponent() {
	const classes = useStyles();
	const [userInfo] = useGlobal('userInfo');
	return (
		<Avatar
			alt="Preview Display"
			src={userInfo.display}
			className={classes.previewImage}
		/>
	);
}

export default AvatarComponent;
