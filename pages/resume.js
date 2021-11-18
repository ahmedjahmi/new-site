import Head from 'next/head';
import Layout from '../components/layout/layout';
import pageStyles from '../styles/page.module.scss';
import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';
import { useUser, getSession } from '@auth0/nextjs-auth0';
import getUserByEmail from '../lib/controllers/users/getUserByEmail';

export default function Resume({ dbUser, isAdmin }) {
	const { user: authUser, error, isLoading } = useUser();
	const isLoggedIn = authUser ? true : false;
	const userId = dbUser ? dbUser._id : null;
	const myResume =
		'https://res.cloudinary.com/ds2pg7vex/image/upload/v1637279388/ahmed-jahmi-blog/Copy_of_resume_AhmedJahmi_4_qopjh5.png';
	const src = buildUrl(myResume, {
		cloud: {
			cloudName: 'ds2pg7vex',
		},
	});

	return (
		<Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} userId={userId}>
			<Head>
				<title>Ahmed Jahmi | Resume</title>
			</Head>
			<div className={pageStyles.resumePageContainer}>
				<div className={pageStyles.resumeContainer}>
					<Image src={src} width={3090} height={3999} layout='responsive' />
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ req, res }) {
	const session = getSession(req, res);

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
