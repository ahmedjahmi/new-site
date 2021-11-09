import Layout, { siteTitle } from '../../components/layout/layout';
import Post from '../../components/blog/post';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import {
	getImageSrc,
	getImageMetaSrc,
	getAuthorImage,
} from '../../lib/utils/cloudinary';
import processMarkdown from '../../lib/utils/processMarkdown';
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
	const host = process.env.NEXT_PUBLIC_HOST;
	const blogPostUrl = host + router.asPath;
	const src = getImageSrc(article.image_url);
	const metaSrc = getImageMetaSrc(article.image_url);
	const authorImg = article.user.image_url;
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
			/>
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
