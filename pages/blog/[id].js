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
				<div>
					<img src={postData.image} />
					<h1 className={utilStyles.headingXl}>
						<span className={utilStyles.spanUnderline}>{postData.title}</span>
					</h1>
				</div>

				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <div className={utilStyles.authorInfo}>
				  <div className={utilStyles.authorText}>by {postData.author}</div>
          <img
            src='/images/profile.jpg'
            className={`${utilStyles.borderCircle} ${utilStyles.authorImage}`}
            alt={postData.author}
          />
        </div>
				<div className={utilStyles.dateText}>
					<Date dateString={postData.date} />
				</div>
			</article>
		</Layout>
	);
}