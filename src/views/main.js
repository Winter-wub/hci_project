import React, { useGlobal } from 'reactn';
import { makeStyles } from '@material-ui/styles';
import ImageGallery from 'react-image-gallery';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import MessageIcon from '@material-ui/icons/Message';
import { GridItem, GridView } from '../components/grid';
import Card from '../components/card';
import 'react-image-gallery/styles/css/image-gallery.css';
import history from '../utils/history';

const useStyles = makeStyles(theme => ({
	image: {
		height: 400,
		width: '90%',
	},
}));

function Main() {
	const classes = useStyles();
	const images = [
		{
			original: 'http://lorempixel.com/1000/600/nature/1/',
			thumbnail: 'http://lorempixel.com/250/150/nature/1/',
		},
		{
			original: 'http://lorempixel.com/1000/600/nature/2/',
			thumbnail: 'http://lorempixel.com/250/150/nature/2/',
		},
	];
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
										<Fab color="secondary">
											<Badge
												className={classes.margin}
												badgeContent={4}
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
							<Typography variant="h5"> ผู้ใช้ทดสอบ </Typography>
						</GridItem>
						<GridItem>
							<ImageGallery
								infinite={true}
								showPlayButton={false}
								showThumbnails={false}
								items={images}
							/>
						</GridItem>
						<GridItem>
							<GridView direction="row">
								<GridItem>
									<Fab color="primary">
										<FavoriteIcon />
									</Fab>
								</GridItem>
								<GridItem>
									<Fab color="secondary">
										<CloseIcon fontSize="20" />
									</Fab>
								</GridItem>
							</GridView>
						</GridItem>
					</GridView>
				</Card>
			</GridItem>
			<GridItem />
		</GridView>
	);
}

export default Main;
