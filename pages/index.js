import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout/layout';
import utilStyles from '../styles/utils.module.scss';
import Link from 'next/link';

export default function Home() {
  return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>
					My name is Ahmed Jahmi. I'm a Full Stack Developer that thinks beyond
					the current problem, considering the larger context and seeking out
					the bigger picture. Adaptive to change and willing to learn, I've had
					the opportunity to work with many different languages and frameworks
					including JavaScript, React, Python, and Django. Every problem is
					unique, and so should be their solutions.
				</p>
			</section>
		</Layout>
	);
}
