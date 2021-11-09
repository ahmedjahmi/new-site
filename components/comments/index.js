import styles from './comment.module.scss';
import CommentForm from './form';
import CommentList from './list';
import useComments from '../../lib/hooks/useComments';

function Comments({ isAdmin, dbUser, prefetchedComments, queryId }) {
	const {
		text,
		setText,
		comments,
		onSubmit,
		onDelete,
		isLoading,
		isError,
		swrError,
	} = useComments({ prefetchedComments: prefetchedComments, queryId: queryId });

	if (isLoading) return <div>loading comments...</div>;
	if (isError) return <div>{swrError}</div>;

	return (
		<div>
			<div className={styles.CommentsHeader}>
				<h3 className={styles.CommentsHeading}>
					<span>Comments</span>
				</h3>
			</div>
			<CommentForm
				onSubmit={onSubmit}
				text={text}
				setText={setText}
				dbUser={dbUser}
			/>
			<CommentList
				comments={comments}
				onDelete={onDelete}
				dbUser={dbUser}
				isAdmin={isAdmin}
				isLoading={isLoading}
				isError={isError}
				swrError={swrError}
			/>
		</div>
	);
}

export default Comments;
