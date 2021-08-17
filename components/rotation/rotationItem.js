import styles from './rotation.module.scss';
import Link from 'next/link';

export default function RotationItem(props) {
	return (
		<Link href={props.url}>
			<a href={props.url} target='_blank'>
				<div className={styles.rotationItem}>
					<div className={styles.rotationItemType}>{props.rotationType}</div>
					<div className={styles.rotationItemLink}>{props.title}</div>
				</div>
			</a>
		</Link>
	);
}
