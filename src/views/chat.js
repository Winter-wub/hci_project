import React, { useGlobal, useEffect } from 'reactn';
import GobackButton from '../components/goBackButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { GridItem, GridView } from '../components/grid';
import Card from '../components/card';
import history from '../utils/history';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: 'inline',
	},
}));

function Main() {
	const classes = useStyles();
	return (
		<GridView>
			<GridItem>
				<Card
					cardHeaderActionComponent={<GobackButton />}
					title="Chat"
					titleAlignItems="center">
					<GridView>
						<GridItem>
							<List className={classes.root}>
								<ListItem
									alignItems="flex-start"
									onClick={() => history.push('/profile?id=')}>
									<ListItemAvatar>
										<Avatar
											alt="Remy Sharp"
											src="/static/images/avatar/1.jpg"
										/>
									</ListItemAvatar>
									<ListItemText
										primary="Name"
										secondary={
											<React.Fragment>
												<Typography
													component="span"
													className={classes.inline}
													color="textPrimary">
													Ali Connors
												</Typography>
												{' is interest You'}
											</React.Fragment>
										}
									/>
								</ListItem>
							</List>
						</GridItem>
					</GridView>
				</Card>
			</GridItem>
		</GridView>
	);
}

export default Main;
