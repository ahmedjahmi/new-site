import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout/layout';
import pageStyles from '../styles/page.module.scss';
import Link from 'next/link';
import Date from '../components/date';
import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';
import { useUser, getSession } from '@auth0/nextjs-auth0';
import getArticles from '../lib/controllers/getArticles';
import getUserByEmail from '../lib/controllers/users/getUserByEmail';

export default function HomePage({ articles, dbUser, isAdmin }) {
	const { user: authUser, error, isLoading } = useUser();
	const isLoggedIn = authUser ? true : false;
	const userId = dbUser ? dbUser._id : null;

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
		<Layout isAdmin={isAdmin} isLoggedIn={isLoggedIn} userId={userId}>
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
			</div>
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
