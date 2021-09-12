import distanceToNow from '../../lib/dateRelative';
import styles from './comment.module.scss';

function CommentList({
	comments,
	onDelete,
	dbUser,
	isAdmin,
	isLoading,
	isError,
	swrError,
}) {
	if (isLoading) return <div>loading comments...</div>;
	if (isError) return <div>{swrError}</div>;
	return (
		<div>
			<div className={styles.CommentsHeader}>
				<h3 className={styles.CommentsHeading}>
					<span>Comments</span>
				</h3>
			</div>
			<div className={styles.CommentList}>
				{comments.map((comment) => {
					const isAuthor = dbUser && dbUser._id === comment.user._id;

					return (
						<div key={comment.createdAt} className={styles.Comment}>
							<div className={styles.CommentHeader}>
								<div className={styles.CommentImage}>
									<img src='https://via.placeholder.com/40' />
								</div>
								<div className={styles.CommentInfo}>
									<div className={styles.CommentUser}>
										<b>{comment.user.username}</b>
									</div>
									<div className={styles.CommentDate}>
										<time>{distanceToNow(comment.createdAt)}</time>
									</div>
								</div>
								{(isAdmin || isAuthor) && (
									<div className={styles.CommentDelete}>
										<button onClick={() => onDelete(comment._id)}>X</button>
									</div>
								)}
							</div>

							<div className={styles.CommentBody}>
								<div className={styles.CommentText}>{comment.text}</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default CommentList;
