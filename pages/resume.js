import Head from 'next/head';
import Layout from '../components/layout/layout';
import pageStyles from '../styles/page.module.scss';
import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';
import { useUser, getSession } from '@auth0/nextjs-auth0';
import axios from 'axios';

export default function Resume({ dbUser, isAdmin }) {
	const { user: authUser, error, isLoading } = useUser();
	const isUser = authUser ? true : false;
	const userId = dbUser ? dbUser._id : null;
	const myResume =
		'https://res.cloudinary.com/ds2pg7vex/image/upload/v1621435955/ahmed-jahmi-blog/Copy_of_resume_AhmedJahmi_3_j5dokq.png';
	const src = buildUrl(myResume, {
		cloud: {
			cloudName: 'ds2pg7vex',
		},
	});

	return (
		<Layout isUser={isUser} isAdmin={isAdmin} userId={userId}>
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
	const host = process.env.HOST;
	const session = getSession(req, res);
	if (session) {
		const authUser = session.user;
		const dbUserResponse = await axios.post(`${host}/api/users/findByEmail`, {
			email: authUser.email,
		});
		const dbUser = await dbUserResponse.data;
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
