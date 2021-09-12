import styles from './comment.module.scss';

function CommentForm({ text, setText, onSubmit, dbUser }) {
	return (
		<form onSubmit={onSubmit}>
			<textarea
				rows='3'
				placeholder={
					dbUser ? `Leave a comment...` : 'Please login to leave a comment'
				}
				onChange={(e) => setText(e.target.value)}
				value={text}
				disabled={!dbUser}
			/>
			<div className={styles.CommentSubmit}>
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
