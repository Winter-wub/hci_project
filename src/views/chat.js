import React, { useGlobal } from 'reactn';
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

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	ListItem: {
		cursor: 'pointer',
	},
	inline: {
		display: 'inline',
	},
}));

function Main() {
	const classes = useStyles();
	const [message] = useGlobal('message');
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
								{message.map(message => (
									<ListItem
										className={classes.ListItem}
										key={message.id}
										alignItems="flex-start"
										onClick={() => history.push(`/profile?id=${message.id}`)}>
										<ListItemAvatar>
											<Avatar alt="Remy Sharp" src={message.display} />
										</ListItemAvatar>
										<ListItemText
											primary={message.name}
											secondary={
												<React.Fragment>
													<Typography
														component="span"
														className={classes.inline}
														color="textPrimary">
														{message.name} ({message.age})
													</Typography>
													{' is interest You'}
												</React.Fragment>
											}
										/>
									</ListItem>
								))}
							</List>
						</GridItem>
					</GridView>
				</Card>
			</GridItem>
		</GridView>
	);
}

export default Main;
