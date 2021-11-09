import styles from './blog.module.scss';
import Likes from '../likes';
import Share from '../share';
import Comments from '../comments';
import Container from '../container';

function Social({
	dbUser,
	isAdmin,
	likes,
	queryId,
	blogPostUrl,
	title,
	comments,
}) {
	return (
		<Container>
			<div className={styles.socialContainer}>
				<Likes
					dbUser={dbUser}
					isAdmin={isAdmin}
					prefetchedLikes={likes}
					queryId={queryId}
				/>
				<Share blogPostUrl={blogPostUrl} title={title} />
			</div>
			<Comments
				dbUser={dbUser}
				isAdmin={isAdmin}
				prefetchedComments={comments}
				queryId={queryId}
			/>
		</Container>
	);
}

export default Social;
