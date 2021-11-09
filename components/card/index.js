import styles from './card.module.scss';

function Card({ children, modifier }) {
	const isHorizontal = modifier === 'horizontal' ? true : false;
	return (
		<>
			<article
				className={
					isHorizontal
						? `${styles.card} ${styles.cardHorizontal}`
						: `${styles.card}`
				}
			>
				{children}
			</article>
		</>
	);
}

export default Card;
