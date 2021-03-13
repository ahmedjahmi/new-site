import Link from 'next/link';
import styles from './nav.module.scss';
import { useState } from 'react';

export default function MenuItem(props) {
	const [open, setOpen] = useState(props.open);

	// conditionally set styles
	const [delay, setDelay] = useState(`${props.delay}`);
	const toggle = open
		? `${styles.menuItemContainer} ${styles.menuItemContainerOpen}`
		: `${styles.menuItemContainer}`;

	return (
		<div className={toggle} delay={delay}>
			<div className={styles.menuItem} onClick={props.onClick} delay={delay}>
				<Link href={props.href}>
					<a>{props.children}</a>
				</Link>
			</div>
			<div className={styles.menuItemLine} delay={delay} />
		</div>
	);
}
