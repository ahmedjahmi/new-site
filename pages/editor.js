import Head from 'next/head';
import Layout from '../components/layout/layout';
import pageStyles from '../styles/page.module.scss';
import ArticleForm from '../components/forms/article/article';
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function Editor() {
	const router = useRouter();
	const isAdmin = router.query.role == 'admin' ? true : false;
	if (isAdmin) {
		const articleForm = {
			title: '',
			description: '',
			image_url: '',
			image_alt: '',
			user: '60fccc61140cb96ec1fdad06',
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
});
