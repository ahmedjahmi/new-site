import { useEffect, useState } from 'react';
import axios from 'axios';

// UNTESTED HOOK

export default function useDbUser(authUser) {
	const [status, setStatus] = useState('idle');
	const [dbUser, setDbUser] = useState({});
	const host = process.env.HOST;

	useEffect(() => {
		if (!authUser) return;

		const fetchDbUser = async () => {
			setStatus('fetching');
			const email = authUser.email;
			const response = await axios.post(`${host}/api/users/findByEmail`, {
				email: email,
			});
			setDbUser(response.data);
			setStatus('fetched');
		};

		fetchDbUser();
	}, [authUser]);

	return { status, dbUser };
}
