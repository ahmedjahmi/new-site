import Layout, { siteTitle } from '../../components/layout/layout';
import Image from 'next/image';
import Date from '../../components/date';
import Share from '../../components/share/share';
import OnRotation from '../../components/onRotation/onRotation';
import pageStyles from '../../styles/page.module.scss';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { buildUrl } from 'cloudinary-build-url';

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
	// const host = process.env.NEXT_PUBLIC_HOST;
	const host = 'https://www.ahmedjahmi.com';

	// testing that a valid url works
	// const blogPostUrl = 'https://www.ahmedjahmi.com';
	const blogPostUrl = host + router.asPath;
	const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE;
	const size = 32;
	const rotation = postData.OnRotation;

	// cloudinary
	const src = buildUrl(postData.image, {
		cloud: {
			cloudName: 'ds2pg7vex',
		},
	});

	const metaSrc = buildUrl(postData.image, {
		cloud: {
			cloudName: 'ds2pg7vex',
		},
		transformations: {
			width: 1200,
			height: 628,
		},
	});

	// metadata
	const postMetaData = {
		title: postData.title,
		description: postData.description,
		openGraph: {
			url: blogPostUrl,
			title: postData.title,
			description: postData.description,
			images: [
				{
					url: metaSrc,
					alt: postData.imageAlt,
				},
			],
			site_name: siteTitle,
		},
	};

	return (
		<Layout>
			<NextSeo {...postMetaData} />
			<div className={pageStyles.blogArticlePageContainer}>
				<div className={pageStyles.hero}>
					<div className={pageStyles.heroInner}>
						<div className={pageStyles.heroArtContainer}>
							<div className={pageStyles.heroArt}>
								<div className={pageStyles.heroShot}>
									<Image
										src={src}
										width={1000}
										height={750}
										alt='apple shortcuts app'
									/>
								</div>
								{/* <div className={pageStyles.heroArtBy}>
									Art by <a href={postData.artHref}>{postData.byArtist}</a>
								</div> */}
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
							<div className={pageStyles.authorText}>
								by{' '}
								<a href='https://twitter.com/jahmiamor' target='_blank'>
									{postData.author}
								</a>
							</div>
							<Image
								src='/images/profile.jpg'
								width={32}
								height={32}
								className={pageStyles.borderCircle}
								alt={postData.author}
							/>
						</div>
						<Share
							blogPostUrl={blogPostUrl}
							title={postData.title}
							twitterHandle={twitterHandle}
							size={size}
						/>
						<OnRotation rotation={rotation} />
					</article>
				</div>
			</div>
		</Layout>
	);
}
