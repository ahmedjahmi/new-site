import styles from './likes.module.scss';

function LikeButton({ onLike, likes, dbUser }) {
	const isLiked = !dbUser || likes.includes(dbUser._id) == false ? false : true;

	return (
		<>
			{isLiked ? (
				<div className={styles.likeButton}>
					<button onClick={onLike}>
						<span className='material-icons'>favorite</span>
					</button>
				</div>
			) : (
				<div className={styles.unlikeButton}>
					<button onClick={onLike}>
						<span className='material-icons'>favorite_border</span>
					</button>
				</div>
			)}
		</>
	);
}

export default LikeButton;
