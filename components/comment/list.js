import distanceToNow from '../../lib/dateRelative';
import { buildUrl } from 'cloudinary-build-url';
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
					// TODO: hasImage & imageSrc can be refactored after user count is reset
					// first two users don't have images, so this condition was set as quick fix
					const hasImage = comment.user.image_url ? true : false;
					const imageSrc = (hasImage) => {
						if (hasImage) {
							const src = buildUrl(comment.user.image_url, {
								cloud: {
									cloudName: 'ds2pg7vex',
								},
								transformations: {
									width: 40,
									height: 40,
								},
							});
							return src;
						}
						return 'https://via.placeholder.com/40';
					};

					return (
						<div key={comment.createdAt} className={styles.Comment}>
							<div className={styles.CommentHeader}>
								<div className={styles.CommentImage}>
									<img src={imageSrc(hasImage)} />
								</div>
								<div className={styles.CommentInfo}>
									<div className={styles.CommentUser}>
										<b>
											{comment.user.username == comment.user.email
												? comment.user.email
												: comment.user.username}
										</b>
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
