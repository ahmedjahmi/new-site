import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0';
import axios from 'axios';

export default function Profile({ user }) {
	const { user: authUser, error, isLoading } = useUser();
	return (
		<>
			{isLoading && <p>Loading...</p>}
			{error && (
				<>
					<h4>Error</h4>
					<pre>{error.message}</pre>
				</>
			)}
			{authUser && (
				<>
					<p>Hello, {authUser.email}!</p>
					<p>Hello mongodb user {user.email}</p>
				</>
			)}
			{!isLoading && !error && !authUser && (
				<>
					<p>Not loading, not error, not authUser...</p>
					<p>I dk what's happening</p>
				</>
			)}
		</>
	);
}

// export async function getServerSideProps() {
// 	const user = await axios.get('/api/users/60f4caadf9c69304b9a8141c', {
// 		port: 3000,
// 	});

// 	return {
// 		props: {
// 			user,
// 		},
// 	};
// }

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps({ params }) {
		const user = await axios.get(
			`http://localhost:3000/api/users/${params.id}`
		);

		return {
			props: {
				user,
			},
		};
	},
});
