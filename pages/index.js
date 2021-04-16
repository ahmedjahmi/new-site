import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout/layout';
import pageStyles from '../styles/page.module.scss';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';

export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
}

export default function Blog({ allPostsData }) {
	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<div className={pageStyles.blogPageContainer}>
				<section className={`${pageStyles.headingMd} ${pageStyles.padding1px}`}>
					<h2 className={pageStyles.headingLg}>Blog</h2>
					<ul className={pageStyles.list}>
						{allPostsData.map(({ id, date, title, author }) => (
							<li className={pageStyles.listItem} key={id}>
								<Link href={`/blog/${id}`}>
									<a>{title}</a>
								</Link>
								<p className={pageStyles.blogAuthor}>written by {author}</p>
								<small className={pageStyles.dateText}>
									<Date dateString={date} />
								</small>
							</li>
						))}
					</ul>
				</section>
			</div>
		</Layout>
	);
}
