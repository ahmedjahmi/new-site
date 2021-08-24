import Layout, { siteTitle } from '../../components/layout/layout';
import Image from 'next/image';
import Date from '../../components/date';
import Share from '../../components/share/share';
import Rotation from '../../components/rotation/rotation';
import pageStyles from '../../styles/page.module.scss';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { buildUrl } from 'cloudinary-build-url';
import axios from 'axios';
import remark from 'remark';
import html from 'remark-html';
import { useUser, getSession } from '@auth0/nextjs-auth0';

const processMarkdown = async (content) => {
	const processedContent = await remark().use(html).process(content);
	const contentHtml = processedContent.toString();
	return {
		contentHtml,
	};
};

export default function Post({
	article,
	rotation,
	articleContent,
	dbUser,
	isAdmin,
}) {
	const router = useRouter();
	const { user: authUser, error, isLoading } = useUser();
	const isUser = authUser ? true : false;
	const userId = dbUser ? dbUser._id : null;
	// const host = process.env.NEXT_PUBLIC_HOST;
	// const host = 'https://www.ahmedjahmi.com';
	const host = 'http://localhost:3000';

	// testing that a valid url works
	// const blogPostUrl = 'https://www.ahmedjahmi.com';
	const blogPostUrl = host + router.asPath;
	const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE;
	const size = 32;

	// cloudinary
	const src = buildUrl(article.image_url, {
		cloud: {
			cloudName: 'ds2pg7vex',
		},
	});

	const metaSrc = buildUrl(article.image_url, {
		cloud: {
			cloudName: 'ds2pg7vex',
		},
		transformations: {
			width: 1200,
			height: 628,
		},
	});

	const authorImg =
		'https://res.cloudinary.com/ds2pg7vex/image/upload/v1621104211/ahmed-jahmi-blog/profile_image_ywghxh.heic';

	const authorImgSrc = buildUrl(authorImg, {
		cloud: {
			cloudName: 'ds2pg7vex',
		},
	});

	// metadata
	const postMetaData = {
		title: article.title,
		description: article.description,
		openGraph: {
			url: blogPostUrl,
			title: article.title,
			description: article.description,
			images: [
				{
					url: metaSrc,
					alt: article.imageAlt,
				},
			],
			site_name: siteTitle,
		},
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	return (
		<Layout isAdmin={isAdmin} isUser={isUser} userId={userId}>
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
								<div className={pageStyles.heroArtBy}>
									Art by <a href={article.artist_url}>{article.by_artist}</a>
								</div>
							</div>
						</div>
						<div className={pageStyles.heroHeader}>
							<header>
								<h1 className={pageStyles.heroTitle}>
									<span className={pageStyles.spanUnderline}>
										{article.title}
									</span>
								</h1>
								{/* TODO: edit hardcoded author name */}
								<p className={pageStyles.byLine}>by Ahmed Jahmi</p>
								<div className={pageStyles.dateText}>
									<Date dateString={article.createdAt} />
								</div>
							</header>
						</div>
					</div>
				</div>
				<div className={pageStyles.articleContainer}>
					<article>
						<div
							dangerouslySetInnerHTML={{ __html: articleContent.contentHtml }}
						/>
						<div className={pageStyles.authorInfo}>
							<div className={pageStyles.authorText}>
								by{' '}
								<a href='https://twitter.com/jahmiamor' target='_blank'>
									Ahmed Jahmi
								</a>
							</div>
							<Image
								src={authorImgSrc}
								width={32}
								height={32}
								className={pageStyles.borderCircle}
								alt='Ahmed Jahmi'
							/>
						</div>
						<Share
							blogPostUrl={blogPostUrl}
							title={article.title}
							twitterHandle={twitterHandle}
							size={size}
						/>
						<Rotation rotation={rotation} />
					</article>
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ params, req, res }) {
	const host = process.env.HOST;
	const baseUrl = `${host}/api/articles`;
	const response = await axios.get(`${baseUrl}/${params.id}`);
	const { article, rotation } = await response.data.data;
	const articleContent = await processMarkdown(article.content);
	const session = getSession(req, res);
	if (session) {
		const authUser = session.user;
		const dbUserResponse = await axios.post(`${host}/api/users/findByEmail`, {
			email: authUser.email,
		});
		const dbUser = await dbUserResponse.data;
		const isAdmin = dbUser.role === 'admin' ? true : false;
		return {
			props: {
				article: article,
				rotation: rotation,
				articleContent: articleContent,
				dbUser: dbUser,
				isAdmin: isAdmin,
			},
		};
	}

	return {
		props: {
			article: article,
			rotation: rotation,
			articleContent: articleContent,
		},
	};
}
