import Head from 'next/head';
import styles from './layout.module.scss';
import pageStyles from '../../styles/page.module.scss';
import Link from 'next/link';
import Nav from '../nav/nav';

const name = 'Ahmed Jahmi';
export const siteTitle = 'AhmedJahmi.com';

export default function Layout({ children, home }) {
	return (
		<div className={styles.container}>
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap'
					rel='stylesheet'
				/>
				<meta
					name='description'
					content='Ahmed Jahmi fullstack software engineer'
				/>
				{/* TODO: set og:image content to proper photo for link preview */}
				{/* <meta
					property='og:image'
					content={`https://og-image.vercel.app/${encodeURI(
						siteTitle
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/> */}
				<meta name='og:title' content={siteTitle} />
				<meta name='twitter:card' content='summary_large_image' />
			</Head>
			<header className={styles.header}>
				<Nav />
			</header>
			<main>{children}</main>
		</div>
	);
}
