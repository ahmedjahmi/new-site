import styles from './card.module.scss';

function Card({ children, key, modifier }) {
	const isHorizontal = modifier === 'horizontal' ? true : false;
	return (
		<>
			<div
				key={key}
				className={
					isHorizontal
						? `${styles.card} ${styles.cardHorizontal}`
						: `${styles.card}`
				}
			>
				{children}
			</div>
		</>
	);
}

export default Card;
