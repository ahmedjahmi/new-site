import Link from 'next/link';
import styles from './nav.module.scss';
import { useState, useEffect } from 'react';
import MenuItem from './menuItem';
import MenuButton from './menuButton';
import Menu from './menu';

export default function Nav() {
	const [menuOpen, setMenuOpen] = useState(false);

	const handleMenuClick = () => {
		setMenuOpen(!menuOpen);
	};
	const handleLinkClick = () => {
		setMenuOpen(false);
	};

	const menu = ['home', 'blog', 'projects', 'contact'];

	const menuItems = menu.map((val, index) => {
		const pathFromVal = val !== 'home' ? `/${val}` : '/';
		const newVal = val.charAt(0).toUpperCase() + val.slice(1);
		return (
			<MenuItem
				key={index}
				delay={index}
				onClick={handleLinkClick}
				href={pathFromVal}
				open={menuOpen}
			>
				{newVal}
			</MenuItem>
		);
	});

	return (
		<>
			<div className={styles.nav}>
				<MenuButton open={menuOpen} onClick={handleMenuClick} />
				<div className={styles.avatar}>
					<img
						src='/images/profile.jpg'
						alt='ahmed jahmi'
						className={styles.avatarImage}
					/>
				</div>
			</div>
			<Menu open={menuOpen}>{menuItems}</Menu>
		</>
	);
}
