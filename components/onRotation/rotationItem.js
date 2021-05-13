import styles from './onRotation.module.scss';
import Link from 'next/link';

export default function RotationItem(props) {
	return (
		<div className={styles.rotationItem}>
			<div className={styles.rotationItemType}>{props.rotationType}</div>
			<div className={styles.rotationItemLink}>
				<Link href={props.url}>
					<a target='_blank'>{props.title}</a>
				</Link>
			</div>
		</div>
	);
}
