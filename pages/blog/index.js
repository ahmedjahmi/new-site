import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout, { siteTitle } from '../../components/layout/layout';
import pageStyles from '../../styles/page.module.scss';
import Date from '../../components/date';
import { useUser, getSession } from '@auth0/nextjs-auth0';
import getArticles from '../../lib/controllers/getArticles';
import getUserByEmail from '../../lib/controllers/getUserByEmail';

export default function Blog({ articles, dbUser, isAdmin }) {
	const { user: authUser, error, isLoading } = useUser();
	const isUser = authUser ? true : false;
	const userId = dbUser ? dbUser._id : null;

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	return (
		<Layout isAdmin={isAdmin} isUser={isUser} userId={userId}>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<div>content goes here.</div>
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
