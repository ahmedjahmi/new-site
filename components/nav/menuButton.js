import Link from 'next/link';
import styles from './nav.module.scss';
import { useState, useEffect } from 'react';

export default function MenuButton(props) {
	const [open, setOpen] = useState({ ...props.open });

	useEffect(() => {
		setOpen(props.open);
	}, [props.open]);

	// conditionally set styles
	const topLine = open
		? `${styles.menuButtonLine} ${styles.menuButtonLineTop} ${styles.menuButtonLineTopOpen}`
		: `${styles.menuButtonLine} ${styles.menuButtonLineTop}`;
	const middleLine = open
		? `${styles.menuButtonLine} ${styles.menuButtonLineMiddle} ${styles.menuButtonLineMiddleOpen}`
		: `${styles.menuButtonLine} ${styles.menuButtonLineMiddle}`;
	const bottomLine = open
		? `${styles.menuButtonLine} ${styles.menuButtonLineBottom} ${styles.menuButtonLineBottomOpen}`
		: `${styles.menuButtonLine} ${styles.menuButtonLineBottom}`;

	return (
		<div className={styles.menuButtonContainer} onClick={props.onClick}>
			<div className={topLine}></div>
			<div className={middleLine}></div>
			<div className={bottomLine}></div>
		</div>
	);
}
