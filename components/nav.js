import Link from 'next/link';
import styles from './nav.module.scss';

const name = 'Ahmed Jahmi';

export default function Nav() {
  return (
		<nav className={styles.nav}>
			<div className={styles.navImage}>
				<Link href='/'>
					<a>
						<img
							src='/images/profile.jpg'
							alt={name}
						/>
					</a>
				</Link>
			</div>
			<ul>
				<li>
					<Link href='/blog'>
						<a>blog</a>
					</Link>
				</li>
				<li>
					<Link href='/projects'>
						<a>projects</a>
					</Link>
				</li>
				<li>
					<Link href='/contact'>
						<a>contact</a>
					</Link>
				</li>
				<li>
          <Link href='/about'>
            <a>about</a>
          </Link>
        </li>
			</ul>
      <div className={styles.mobileBar}>
        <span></span>
        <span></span>
        <span></span>
      </div>
		</nav>
	);
}