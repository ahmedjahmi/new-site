import styles from './comment.module.scss';
import Button from '../button';

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
					<Button type='submit'>Submit</Button>
				) : (
					<Button isLink={true} href='/api/auth/login'>
						Login
					</Button>
				)}
			</div>
		</form>
	);
}

export default CommentForm;
