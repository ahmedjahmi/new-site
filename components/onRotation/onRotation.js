import RotationItem from './rotationItem';
import styles from './onRotation.module.scss';

export default function OnRotation(props) {
	const rotationItems = props.rotation.map((item, index) => {
		const rotationType = Object.keys(item)[0];
		const url = item[rotationType]['url'];
		const title = item[rotationType]['title'];
		const capitalizedRotationType =
			rotationType.charAt(0).toUpperCase() + rotationType.slice(1);
		return (
			<RotationItem
				key={index}
				rotationType={capitalizedRotationType}
				url={url}
				title={title}
			/>
		);
	});

	return (
		<div className={styles.RotationList}>
			<h3 className={styles.onRotation}>
				<span>On Rotation:</span>
			</h3>
			{rotationItems}
		</div>
	);
}
