import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
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
					Allow me to reintroduce myself. My name is Ho- ...just kidding. My
					name is Ahmed Jahmi.
				</p>
			</section>
		</Layout>
	);
}
