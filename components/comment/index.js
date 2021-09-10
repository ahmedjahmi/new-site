import CommentForm from './form';
import CommentList from './list';
import useComments from '../../lib/hooks/useComments';

function Comment({ isAdmin, dbUser }) {
	const {
		text,
		setText,
		comments,
		onSubmit,
		onDelete,
		isLoading,
		isError,
		swrError,
	} = useComments();

	return (
		<div>
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

export default Comment;
