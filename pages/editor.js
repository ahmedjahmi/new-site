import Head from 'next/head';
import Layout from '../components/layout/layout';
import pageStyles from '../styles/page.module.scss';
import ArticleForm from '../components/forms/article/article';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import getUserByEmail from '../lib/controllers/getUserByEmail';

export default function Editor({ dbUserId, isAdmin }) {
	const isUser = isAdmin;
	const userId = dbUserId;
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
			<Layout isAdmin={isAdmin} isUser={isUser} userId={userId}>
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
	async getServerSideProps({ req, res }) {
		// await dbConnect();
		const session = getSession(req, res);
		if (session) {
			const authUser = session.user;
			const email = authUser.email;
			const unparsedDbUser = await getUserByEmail({ email: email });
			const dbUser = JSON.parse(JSON.stringify(unparsedDbUser));
			const isAdmin = dbUser.role === 'admin' ? true : false;
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
