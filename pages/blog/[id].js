import Layout, { siteTitle } from '../../components/layout/layout';
import Image from 'next/image';
import Date from '../../components/date';
import Share from '../../components/share/share';
import Rotation from '../../components/rotation/rotation';
import Comments from '../../components/comments';
import Likes from '../../components/likes';
import pageStyles from '../../styles/page.module.scss';
import Post from '../../components/blog/post';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import {
	getImageSrc,
	getImageMetaSrc,
	getAuthorImage,
} from '../../lib/utils/cloudinary';
import processMarkdown from '../../lib/utils/processMarkdown';
// import getPostMetaData from '../../lib/utils/postMetaData';
import { useUser, getSession } from '@auth0/nextjs-auth0';
import getArticlePageData from '../../lib/controllers/articles/getArticlePageData';
import getUserByEmail from '../../lib/controllers/users/getUserByEmail';

export default function PostPage({
	article,
	rotation,
	articleContent,
	dbUser,
	isAdmin,
	queryId,
}) {
	const router = useRouter();
	const { user: authUser, error, isLoading } = useUser();
	const isLoggedIn = authUser ? true : false;
	const userId = dbUser ? dbUser._id : null;
	// const host = process.env.NEXT_PUBLIC_HOST;
	// const host = 'https://www.ahmedjahmi.com';
	const host = 'http://localhost:3000';

	// testing that a valid url works
	// const blogPostUrl = 'https://www.ahmedjahmi.com';
	const blogPostUrl = host + router.asPath;
	const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE;
	// const size = 32;

	const src = getImageSrc(article.image_url);

	const metaSrc = getImageMetaSrc(article.image_url);

	const authorImg =
		'https://res.cloudinary.com/ds2pg7vex/image/upload/v1621104211/ahmed-jahmi-blog/profile_image_ywghxh.heic';

	const authorImgSrc = getAuthorImage(authorImg);

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
		<Layout isAdmin={isAdmin} isLoggedIn={isLoggedIn} userId={userId}>
			<NextSeo {...postMetaData} />
			<Post
				article={article}
				rotation={rotation}
				articleContent={articleContent}
				dbUser={dbUser}
				isAdmin={isAdmin}
				queryId={queryId}
				imageSrc={src}
				authorImgSrc={authorImgSrc}
				blogPostUrl={blogPostUrl}
				twitterHandle={twitterHandle}
			/>
			{/* <div className={pageStyles.blogArticlePageContainer}>
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
								</h1> */}
			{/* TODO: edit hardcoded author name */}
			{/* <p className={pageStyles.byLine}>by Ahmed Jahmi</p>
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
						<div className={pageStyles.socialContainer}>
							<Likes
								dbUser={dbUser}
								isAdmin={isAdmin}
								prefetchedLikes={article.likes}
								queryId={queryId}
							/>
							<Share
								blogPostUrl={blogPostUrl}
								title={article.title}
								twitterHandle={twitterHandle}
								size={size}
							/>
						</div>
						<Comments
							dbUser={dbUser}
							isAdmin={isAdmin}
							prefetchedComments={article.comments}
							queryId={queryId}
						/>
						<Rotation rotation={rotation} />
					</article>
				</div>
			</div> */}
		</Layout>
	);
}

export async function getServerSideProps({ params, req, res }) {
	const queryId = params.id;
	const unparsedData = await getArticlePageData({ id: params.id });
	const data = JSON.parse(JSON.stringify(unparsedData));
	const { article, rotation } = data;

	const articleContent = await processMarkdown(article.content);

	const session = getSession(req, res);

	if (session) {
		const authUser = session.user;
		const email = authUser.email;
		const unparsedDbUser = await getUserByEmail({ email: email });
		const dbUser = JSON.parse(JSON.stringify(unparsedDbUser));
		const isAdmin = dbUser.role === 'admin' ? true : false;

		return {
			props: {
				article: article,
				rotation: rotation,
				articleContent: articleContent,
				dbUser: dbUser,
				isAdmin: isAdmin,
				queryId: queryId,
			},
		};
	}

	return {
		props: {
			article: article,
			rotation: rotation,
			articleContent: articleContent,
			queryId: queryId,
		},
	};
}
