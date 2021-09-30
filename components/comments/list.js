import Comment from './comment';
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
				{comments.map((comment) => (
					<Comment
						dbUser={dbUser}
						comment={comment}
						isAdmin={isAdmin}
						onDelete={onDelete}
					/>
				))}
			</div>
		</div>
	);
}

export default CommentList;
