function CommentForm({ text, setText, onSubmit, dbUser }) {
	return (
		<form onSubmit={onSubmit}>
			<textarea
				rows='2'
				placeholder={
					dbUser ? `Leave a comment...` : 'Please login to leave a comment'
				}
				onChange={(e) => setText(e.target.value)}
				value={text}
				disabled={!dbUser}
			/>
			<div>
				{dbUser ? (
					<div>
						<button type='submit'>Submit</button>
					</div>
				) : (
					<button>Login</button>
				)}
			</div>
		</form>
	);
}

export default CommentForm;
