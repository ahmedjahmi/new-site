import styles from './comment.module.scss';
import Link from 'next/link';

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
					<div>
						<Link href='/api/auth/login'>
							<a className={styles.CommentLogin}>Login</a>
						</Link>
					</div>
				)}
			</div>
		</form>
	);
}

export default CommentForm;
