import Link from 'next/link';
import styles from './nav.module.scss';
import { useState, useEffect } from 'react';

export default function Menu(props) {
	const [menuOpen, setMenuOpen] = useState(false);

	// useEffect will watch props.open,
	// and update menuOpen state to reflect changes
	useEffect(() => {
		setMenuOpen(props.open);
	}, [props.open]);

	return (
		<div
			className={
				menuOpen
					? `${styles.menuContainer} ${styles.menuContainerOpen}`
					: `${styles.menuContainer}`
			}
		>
			{menuOpen ? (
				<div className={styles.menuList}>{props.children}</div>
			) : null}
		</div>
	);
}
