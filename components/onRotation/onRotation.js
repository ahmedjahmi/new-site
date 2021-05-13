import styles from './onRotation.module.scss';
import pageStyles from '../../styles/page.module.scss';
import Link from 'next/link';

export default function OnRotation(props) {
	const music = props.rotation[0].music;
	const podcast = props.rotation[1].podcast;
	const tv = props.rotation[2].tv;
	const book = props.rotation[3].book;
	console.log(Object.keys(props.rotation[0])[0]);

	return (
		<div className={styles.RotationList}>
			<h3 className={styles.onRotation}>
				<span>On Rotation:</span>
			</h3>
			<div className={styles.rotationItem}>
				<div className={styles.rotationItemType}>Music:</div>
				<div className={styles.rotationItemLink}>
					<Link href={music.url}>
						<a>{music.title}</a>
					</Link>
				</div>
			</div>
			<div className={styles.rotationItem}>
				<div className={styles.rotationItemType}>Podcast:</div>
				<div className={styles.rotationItemLink}>
					<Link href={podcast.url}>
						<a>{podcast.title}</a>
					</Link>
				</div>
			</div>
			<div className={styles.rotationItem}>
				<div className={styles.rotationItemType}>TV:</div>
				<div className={styles.rotationItemLink}>
					<Link href={tv.url}>
						<a>{tv.title}</a>
					</Link>
				</div>
			</div>
			<div className={styles.rotationItem}>
				<div className={styles.rotationItemType}>Book:</div>
				<div className={styles.rotationItemLink}>
					<Link href={book.url}>
						<a>{book.title}</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
