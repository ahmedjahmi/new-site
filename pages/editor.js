import Head from 'next/head';
import Layout from '../components/layout/layout';
import pageStyles from '../styles/page.module.scss';
import ArticleForm from '../components/forms/article/article';

export default function Editor() {
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
