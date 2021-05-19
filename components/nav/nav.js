import styles from './nav.module.scss';
import { useState, useEffect } from 'react';
import Link from 'next/link';
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

	useEffect(() => {
		const els = document.getElementsByTagName('main');
		const main = els[0];
		menuOpen ? (main.style.filter = 'blur(2px)') : (main.style.filter = null);
	});

	const menu = ['home', 'resume'];

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
				<div className={styles.homeIconWrapper}>
					<Link href='/'>
						<a>
							<span className='material-icons'>home</span>
						</a>
					</Link>
				</div>
			</div>
			<Menu open={menuOpen}>{menuItems}</Menu>
		</>
	);
}
