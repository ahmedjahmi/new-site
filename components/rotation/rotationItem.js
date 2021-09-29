import Card from '../card';
import styles from './rotation.module.scss';
import Link from 'next/link';

export default function RotationItem({ key, rotationType, url, title }) {
	return (
		<Link href={url}>
			<a href={url} target='_blank'>
				<Card modifier='horizontal'>
					<div className={styles.rotationItemType}>{rotationType}</div>
					<div className={styles.rotationItemLink}>{title}</div>
				</Card>
			</a>
		</Link>
	);
}
