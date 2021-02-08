import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date';

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
  return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<article>
				<span className={utilStyles.spanUnderline}>
					<h1 className={utilStyles.headingXl}>{postData.title}</h1>
				</span>
				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
			</article>
		</Layout>
	);
}