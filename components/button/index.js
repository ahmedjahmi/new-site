import Link from 'next/link';
import styles from './button.module.scss';

function Button({ type, children, onClick, isLink, href }) {
	return (
		<div className={styles.ButtonPrimary}>
			{isLink ? (
				<Link href={href}>
					<a>{children}</a>
				</Link>
			) : (
				<button type={type} onClick={onClick}>
					{children}
				</button>
			)}
		</div>
	);
}

export default Button;
