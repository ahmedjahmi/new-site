import distanceToNow from '../../lib/utils/dateRelative';
import { buildUrl } from 'cloudinary-build-url';
import Card from '../card';
import Button from '../button';
import styles from './comment.module.scss';

function Comment({ dbUser, comment, isAdmin, onDelete }) {
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
		<Card key={comment.createdAt}>
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
						<Button type='button' onClick={() => onDelete(comment._id)}>
							{''}x{''}
						</Button>
					</div>
				)}
			</div>

			<div className={styles.CommentBody}>
				<div className={styles.CommentText}>{comment.text}</div>
			</div>
		</Card>
	);
}

export default Comment;
