import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout/layout';
import pageStyles from '../styles/page.module.scss';
import Link from 'next/link';
import { useUser, getSession } from '@auth0/nextjs-auth0';
import getUserByEmail from '../lib/controllers/users/getUserByEmail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
	faBlog,
	faEnvelope,
	faFileAlt,
} from '@fortawesome/free-solid-svg-icons';

export default function HomePage({ dbUser, isAdmin }) {
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
			<div className={pageStyles.homePageContainer}>
				<section className={pageStyles.padding1px}>
					<div className={pageStyles.intro}>
						<div className={pageStyles.introInfo}>
							<h2>Hey, my name is Ahmed.</h2>
							<div>
								I'm a software engineer living in Brooklyn. I like solving
								problems of all kinds. I am on a journey and this is where I
								blog some of the knowledge I picked up along the way.
							</div>
							<h4>Where to find me:</h4>
							<div className={pageStyles.contactContainer}>
								<a href='https://www.github.com/ahmedjahmi'>
									<FontAwesomeIcon
										className={pageStyles.contactItem}
										icon={faGithub}
									/>
								</a>
								<a href='https://www.linkedin.com/in/ahmed-jahmi-36a706158/'>
									<FontAwesomeIcon
										className={pageStyles.contactItem}
										icon={faLinkedin}
									/>
								</a>
								<a href='mailto:amjahmi@gmail.com'>
									<FontAwesomeIcon
										className={pageStyles.contactItem}
										icon={faEnvelope}
									/>
								</a>
								<Link href='/resume'>
									<a>
										<FontAwesomeIcon
											className={pageStyles.contactItem}
											icon={faFileAlt}
										/>
									</a>
								</Link>
								<Link href='/blog'>
									<a>
										<FontAwesomeIcon
											className={pageStyles.contactItem}
											icon={faBlog}
											size='2x'
										/>
									</a>
								</Link>
							</div>
						</div>
					</div>
				</section>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const session = getSession(context.req, context.res);

	if (session) {
		const authUser = session.user;
		const email = authUser.email;
		const unparsedDbUser = await getUserByEmail({ email: email });
		const dbUser = JSON.parse(JSON.stringify(unparsedDbUser));
		const isAdmin = dbUser.role === 'admin' ? true : false;
		return {
			props: {
				dbUser: dbUser,
				isAdmin: isAdmin,
			},
		};
	}

	return {
		props: {},
	};
}
