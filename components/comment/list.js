import distanceToNow from '../../lib/dateRelative';

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
			{comments.map((comment) => {
				const isAuthor = dbUser && dbUser._id === comment.user._id;

				return (
					<div key={comment.createdAt}>
						{/* TODO: */}
						{/* <div>
              <img />
            </div> */}

						<div>
							<div>
								<b>{comment.user.username}</b>
								<time>{distanceToNow(comment.createdAt)}</time>
								{(isAdmin || isAuthor) && (
									<button onClick={() => onDelete(comment._id)}>X</button>
								)}
							</div>

							<div>{comment.text}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default CommentList;
