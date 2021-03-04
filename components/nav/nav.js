import Link from 'next/link';
import styles from './nav.module.scss';
import {useState} from 'react';

const name = 'Ahmed Jahmi';

// export default function Nav() {
//   return (
// 		<nav className={styles.nav}>
// 			<div className={styles.navImage}>
// 				<Link href='/'>
// 					<a>
// 						<img
// 							src='/images/profile.jpg'
// 							alt={name}
// 						/>
// 					</a>
// 				</Link>
// 			</div>
// 			<ul>
// 				<li>
// 					<Link href='/blog'>
// 						<a>blog</a>
// 					</Link>
// 				</li>
// 				<li>
// 					<Link href='/projects'>
// 						<a>projects</a>
// 					</Link>
// 				</li>
// 				<li>
// 					<Link href='/contact'>
// 						<a>contact</a>
// 					</Link>
// 				</li>
// 				<li>
//           <Link href='/about'>
//             <a>about</a>
//           </Link>
//         </li>
// 			</ul>
//       <div className={styles.mobileBar}>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
// 		</nav>
// 	);
// }

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  }
  const handleLinkClick = () => {
    setMenuOpen(false);
  }

  const menu = ['home', 'blog', 'projects', 'contact']

  const menuItems = menu.map((val, index) => {
    const pathFromVal = val !== 'home' ? `/${val}` : '/';
    const newVal = val.charAt(0).toUpperCase() + val.slice(1);
    return (
      <MenuItem
        key={index}
        // delay={`${index * 0.1}s`}
        onClick={handleLinkClick}
      >
        <Link href={pathFromVal}>
          <a>{newVal}</a>
        </Link>
      </MenuItem>
    )
  })
  return (
    <>
      <div className={styles.nav}>
        <MenuButton open={menuOpen} onClick={handleMenuClick} />
        <div className={styles.logo}>Logo</div>
      </div>
      <Menu open={menuOpen}>
        {menuItems}
      </Menu>
    </>
  )
}