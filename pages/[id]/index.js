import Layout from '../../components/layout/layout';
import Profile from '../../components/profile';
import { useUser, withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import getUserById from '../../lib/controllers/users/getUserById';
import getUserByEmail from '../../lib/controllers/users/getUserByEmail';

export default function ProfilePage({ dbUser, isAdmin, isUser, profileUser }) {
	const { user: authUser, error, isLoading } = useUser();
	const isLoggedIn = authUser ? true : false;
	return (
		<Layout isAdmin={isAdmin} isLoggedIn={isLoggedIn} userId={dbUser._id}>
			{isLoading && <p>Loading...</p>}
			{error && (
				<>
					<h4>Error</h4>
					<pre>{error.message}</pre>
				</>
			)}
			{authUser && (
				<Profile
					dbUser={dbUser}
					isAdmin={isAdmin}
					isUser={isUser}
					profileUser={profileUser}
				/>
			)}
			{!isLoading && !error && !authUser && (
				<>
					<p>Not loading, not error, not user...</p>
					<p>I dk what's happening</p>
				</>
			)}
		</Layout>
	);
}

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps({ params, req, res }) {
		// get the profile's user
		const unparsedProfileUser = await getUserById({ id: params.id });
		const profileUser = JSON.parse(JSON.stringify(unparsedProfileUser));

		let isUser = false;
		let isAdmin = false;

		const session = getSession(req, res);
		if (session) {
			const email = session.user.email;

			// get the logged in user
			const unparsedDbUser = await getUserByEmail({ email: email });
			const dbUser = JSON.parse(JSON.stringify(unparsedDbUser));
			isAdmin = dbUser.role === 'admin' ? true : false;
			isUser = email == profileUser.email ? true : false;
			return {
				props: {
					dbUser,
					profileUser,
					isAdmin,
					isUser,
				},
			};
		}
		return {
			props: {
				profileUser,
				isAdmin,
				isUser,
			},
		};
	},
});
