import styles from './card.module.scss';

function Card({ children, key }) {
	return (
		<>
			<div key={key} className={styles.card}>
				{children}
			</div>
		</>
	);
}

export default Card;
