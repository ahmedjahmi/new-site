import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout/layout';
import Blog from '../../components/blog';
import { useUser, getSession } from '@auth0/nextjs-auth0';
import getArticles from '../../lib/controllers/getArticles';
import getUserByEmail from '../../lib/controllers/users/getUserByEmail';

export default function BlogPage({ articles, dbUser, isAdmin }) {
	const { user: authUser, error, isLoading } = useUser();
	const isLoggedIn = authUser ? true : false;
	const userId = dbUser ? dbUser._id : null;

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	return (
		<Layout isAdmin={isAdmin} isLoggedIn={isLoggedIn} userId={userId}>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<Blog articles={articles} />
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const unparsedArticles = await getArticles();
	const articles = JSON.parse(JSON.stringify(unparsedArticles));

	const session = getSession(context.req, context.res);

	if (session) {
		const authUser = session.user;
		const email = authUser.email;
		const unparsedDbUser = await getUserByEmail({ email: email });
		const dbUser = JSON.parse(JSON.stringify(unparsedDbUser));
		const isAdmin = dbUser.role === 'admin' ? true : false;

		return {
			props: {
				articles: articles,
				dbUser: dbUser,
				isAdmin: isAdmin,
			},
		};
	}

	return {
		props: {
			articles: articles,
		},
	};
}
