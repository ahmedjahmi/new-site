import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout/layout';
import pageStyles from '../styles/page.module.scss';
import Link from 'next/link';
import Date from '../components/date';
import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';
import { useUser, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';
// TODO: use imports below for getServerSideProps TODO
// import dbConnect from '../lib/dbConnect';
// import Article from '../models/Article';

export default function Blog({ articles }) {
	const { user: authUser, error, isLoading } = useUser();
	// cloudinary
	const myImage =
		'https://res.cloudinary.com/ds2pg7vex/image/upload/v1621104211/ahmed-jahmi-blog/profile_image_ywghxh.heic';
	const src = buildUrl(myImage, {
		cloud: {
			cloudName: 'ds2pg7vex',
		},
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<div className={pageStyles.blogPageContainer}>
				<section className={pageStyles.padding1px}>
					<div className={pageStyles.intro}>
						<div className={pageStyles.introInfo}>
							<h2>Hey, my name is Ahmed.</h2>
							<div>
								I'm a software engineer living in Brooklyn. I like solving
								problems of all kinds. I am on a journey and this is where I
								blog some of the knowledge I picked up along the way.
							</div>
						</div>
						<div className={pageStyles.introImageWrapper}>
							<Image
								src={src}
								width={500}
								height={500}
								layout='responsive'
								className={pageStyles.introImage}
								alt='Image of Ahmed Jahmi'
							/>
						</div>
					</div>
				</section>
				<section className={`${pageStyles.headingMd} ${pageStyles.padding1px}`}>
					<h2 className={pageStyles.headingLg}>Blog</h2>
					<ul className={pageStyles.list}>
						{articles.map(({ _id, createdAt, title }) => (
							<li className={pageStyles.listItem} key={_id}>
								<Link href='/blog/[id]' as={`/blog/${_id}`}>
									<a>
										{title}
										<p className={pageStyles.blogAuthor}>
											written by Ahmed Jahmi
										</p>
										<small className={pageStyles.dateText}>
											<Date dateString={createdAt} />
										</small>
									</a>
								</Link>
							</li>
						))}
					</ul>
					{!authUser ? (
						<a href='/api/auth/login'>Login</a>
					) : (
						<div>
							<a href='/api/auth/logout'>Logout</a>
							<a href='/60f4cf56ae605542364b150b'>profile</a>
						</div>
					)}
				</section>
			</div>
		</Layout>
	);
}

export async function getServerSideProps() {
	const host = process.env.HOST;
	const response = await axios.get(`${host}/api/articles/getArticles`);
	const articles = await response.data.articles;

	// TODO: query db instead of fetch from api route for better performance

	// await dbConnect();

	// const unsortedArticles = await Article.find({});

	// const articles = await unsortedArticles.sort((a, b) => {
	// 	if (a.createdAt < b.createdAt) {
	// 		return 1;
	// 	} else {
	// 		return -1;
	// 	}
	// });
	return {
		props: {
			articles: articles,
		},
	};
}

// SAVE COMMENT BELOW:

// export const getServerSideProps = withPageAuthRequired({
// 	async getServerSideProps(context) {
// 		const authUser = getSession(context.req).user;

// 		await dbConnect();
// 		const mongoUser = await User.find({ email: authUser.email });

// 		return {
// 			props: {
// 				mongoUser,
// 			},
// 		};
// 	},
// });
