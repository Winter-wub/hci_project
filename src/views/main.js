import React, { useGlobal, useEffect, useState } from 'reactn';
import { makeStyles } from '@material-ui/styles';
import Swipeable from 'react-swipy';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import MessageIcon from '@material-ui/icons/Message';
import CircularProgress from '@material-ui/core/CircularProgress';

import { GridItem, GridView } from '../components/grid';
import Card from '../components/card';
import history from '../utils/history';
import firebase from '../utils/firebase';
const firestore = firebase.firestore();

const useStyles = makeStyles(theme => ({
	image: {
		height: 568,
		width: 400,
	},
	imageHide: {
		height: 568,
		width: 400,
		zIndex: -1,
	},
	progress: {
		margin: theme.spacing.unit * 2,
	},
	actionsStyles: {
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: 12,
	},
}));

function Main() {
	const [message, setMessage] = useGlobal('message');
	const [isLoad, setLoad] = useState(false);
	const [id] = useGlobal('id');
	const [isLogin] = useGlobal('isLogin');
	const [userInfo] = useGlobal('userInfo');
	const [feed, setFeed] = useState([]);
	const classes = useStyles();

	const removeCard = () => {
		setFeed(feed.slice(1, feed.length));
	};

	const love = async () => {
		let updateData = {
			...feed[0],
		};
		if (updateData.users_like) {
			let newUserslike = updateData.users_like;
			if (!newUserslike.includes(id)) {
				newUserslike.push(id);
				updateData = {
					...feed[0],
					users_like: newUserslike,
				};
			}
		} else {
			updateData = {
				...updateData,
				users_like: [id],
			};
		}
		delete updateData.id;

		await firestore
			.collection('Users')
			.doc(feed[0].id)
			.set({ ...updateData });
	};

	useEffect(() => {
		if (!isLogin) {
			history.push('/login');
		} else {
			setLoad(true);
			firestore
				.collection('Users')
				.where('university', '==', userInfo.university)
				.where('age', '<=', userInfo.interestAge)
				.where('sex', '==', userInfo.interestSex)
				.get()
				.then(res => {
					const mapFeed = res.docs
						.map(doc => {
							const data = doc.data();
							const userid = doc.id;
							console.log(data);
							return {
								...data,
								id: userid,
							};
						})
						.filter(doc => doc.id !== id)
						.filter(doc => doc.users_like && !doc.users_like.includes(id));
					console.log(mapFeed);
					const mapMessage = res.docs
						.map(doc => {
							const data = doc.data();
							const userid = doc.id;

							return {
								...data,
								id: userid,
							};
						})

						.filter(doc => doc.users_like && doc.users_like.includes(id));
					setMessage(mapMessage);
					setFeed(mapFeed);
					setLoad(false);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<GridView>
			<GridItem>
				<Card
					cardHeaderActionComponent={
						<GridView>
							<GridItem>
								<GridView direction="row">
									<GridItem>
										<Fab
											color="secondary"
											onClick={() => history.push('/setup')}>
											<PersonIcon />
										</Fab>
									</GridItem>
									<GridItem>
										<Fab
											color="secondary"
											onClick={() => history.push('/message')}>
											<Badge
												className={classes.margin}
												badgeContent={message.length}
												color="primary">
												<MessageIcon />
											</Badge>
										</Fab>
									</GridItem>
								</GridView>
							</GridItem>
							<GridItem />
						</GridView>
					}
					title="App title"
					titleAlignItems="center"
					titlejustify="space-between">
					<GridView direction="row">
						<GridItem>
							{!isLoad && feed.length > 0 ? (
								<Swipeable
									buttons={({ right, left }) => (
										<div className={classes.actionsStyles}>
											<Fab
												color="primary"
												onClick={async () => {
													await love();
													left();
												}}>
												<FavoriteIcon />
											</Fab>
											<Fab color="secondary" onClick={right}>
												<CloseIcon />
											</Fab>
										</div>
									)}
									onAfterSwipe={removeCard}>
									<div>
										<img
											className={classes.image}
											src={feed[0].display}
											alt={feed[0].name}
										/>
										<Typography>
											{feed[0].name} ({feed[0].age}){' '}
										</Typography>
									</div>
								</Swipeable>
							) : (
								<div>
									<CircularProgress className={classes.progress} />
									Try to come in again
								</div>
							)}
						</GridItem>
					</GridView>
				</Card>
			</GridItem>
			<GridItem />
		</GridView>
	);
}

export default Main;
