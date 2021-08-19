import Head from 'next/head';
import Layout from '../components/layout/layout';
import pageStyles from '../styles/page.module.scss';
import ArticleForm from '../components/forms/article/article';

import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';

export default function Editor({ dbUserId, isAdmin }) {
	if (isAdmin) {
		const articleForm = {
			title: '',
			description: '',
			image_url: '',
			image_alt: '',
			user: dbUserId,
			by_artist: '',
			artist_url: '',
			content: '',
			music_title: '',
			music_url: '',
			podcast_title: '',
			podcast_url: '',
			tv_title: '',
			tv_url: '',
			book_title: '',
			book_url: '',
		};

		return (
			<Layout>
				<Head>
					<title>Ahmed Jahmi | Editor</title>
				</Head>
				<div className={pageStyles.editorPageContainer}>
					<div className={pageStyles.articleFormContainer}>
						<ArticleForm formId='article-form' articleForm={articleForm} />
					</div>
				</div>
			</Layout>
		);
	}
	return (
		<Layout>
			<Head>
				<title>Ahmed Jahmi | Unauthorized</title>
			</Head>
			<div className={pageStyles.editorPageContainer}>
				<p>Sorry, but you do not have access to this page.</p>
			</div>
		</Layout>
	);
}

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(context) {
		const host = process.env.HOST;
		const session = getSession(context.req, context.res);
		if (session) {
			const authUser = session.user;
			const dbUserResponse = await axios.post(`${host}/api/users/findByEmail`, {
				email: authUser.email,
			});
			const dbUser = await dbUserResponse.data;
			const isAdmin = dbUser.role == 'admin' ? true : false;
			const dbUserId = dbUser._id;
			return {
				props: {
					dbUserId,
					isAdmin,
				},
			};
		}
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	},
});
