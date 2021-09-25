import LikeButton from './likeButton';
import LikesCount from './likesCount';
import useLikes from '../../lib/hooks/useLikes';
import styles from './likes.module.scss';

function Likes({ isAdmin, dbUser }) {
	const { likes, onLike, isLoading, isError, swrError } = useLikes();
	if (isLoading) return <div>loading likes...</div>;
	if (isError) return <div>{swrError}</div>;
	return (
		<div className={styles.likesContainer}>
			<LikeButton onLike={onLike} likes={likes} dbUser={dbUser} />
			<LikesCount likes={likes} />
		</div>
	);
}

export default Likes;
