import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0';
import getUserById from '../../lib/controllers/getUserById';

export default function Profile({ dbUser }) {
	const { user, error, isLoading } = useUser();
	return (
		<>
			{isLoading && <p>Loading...</p>}
			{error && (
				<>
					<h4>Error</h4>
					<pre>{error.message}</pre>
				</>
			)}
			{user && (
				<>
					<p>Hello, {user.email}!</p>
					<p>Hello mongodb user {dbUser.email}</p>
				</>
			)}
			{!isLoading && !error && !user && (
				<>
					<p>Not loading, not error, not user...</p>
					<p>I dk what's happening</p>
				</>
			)}
		</>
	);
}

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps({ params }) {
		const unparsedDbUser = await getUserById({ id: params.id });
		const dbUser = JSON.parse(JSON.stringify(unparsedDbUser));

		return {
			props: {
				dbUser,
			},
		};
	},
});
