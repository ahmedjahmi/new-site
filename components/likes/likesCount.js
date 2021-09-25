import styles from './likes.module.scss';

function LikesCount({ likes }) {
	const count = likes.length;

	return (
		<div className={styles.likeCount}>
			<span>{count} Likes</span>
		</div>
	);
}

export default LikesCount;
