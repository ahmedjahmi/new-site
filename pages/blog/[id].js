import Head from 'next/head';
import Layout from '../../components/layout/layout';
import pageStyles from '../../styles/page.module.scss';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date';
import Share from '../../components/share/share';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

// 1st, fetch data to statically generate paths
export async function getStaticPaths() {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false,
	};
}

// then, using the paths returned above,
// fetch data to statically generate page contents
export async function getStaticProps({ params }) {
	const postData = await getPostData(params.id);
	return {
		props: {
			postData,
		},
	};
}

export default function Post({ postData }) {
	const router = useRouter();
	const host = process.env.NEXT_PUBLIC_HOST;

	// testing that a valid url works
	// const blogPostUrl = 'https://www.ahmedjahmi.com';
	const blogPostUrl = host + router.asPath;
	const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE;
	const size = 32;

	return (
		<Layout>
			<NextSeo title={postData.title} />
			<div className={pageStyles.blogArticlePageContainer}>
				<div className={pageStyles.hero}>
					<div className={pageStyles.heroInner}>
						<div className={pageStyles.heroArtContainer}>
							<div className={pageStyles.heroArt}>
								<div className={pageStyles.heroShot}>
									<img src={postData.image} />
								</div>
								<div className={pageStyles.heroArtBy}>
									Art by <a href='#'>Some Artist</a>
								</div>
							</div>
						</div>
						<div className={pageStyles.heroHeader}>
							<header>
								<h1 className={pageStyles.heroTitle}>
									<span className={pageStyles.spanUnderline}>
										{postData.title}
									</span>
								</h1>
								<p className={pageStyles.byLine}>by {postData.author}</p>
								<div className={pageStyles.dateText}>
									<Date dateString={postData.date} />
								</div>
							</header>
						</div>
					</div>
				</div>
				<div className={pageStyles.articleContainer}>
					<article>
						<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
						<div className={pageStyles.authorInfo}>
							<div className={pageStyles.authorText}>by {postData.author}</div>
							<img
								src='/images/profile.jpg'
								className={`${pageStyles.borderCircle} ${pageStyles.authorImage}`}
								alt={postData.author}
							/>
						</div>
						<Share
							blogPostUrl={blogPostUrl}
							title={postData.title}
							twitterHandle={twitterHandle}
							size={size}
						/>
					</article>
				</div>
			</div>
		</Layout>
	);
}
