import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useUser } from '@auth0/nextjs-auth0';
import axios from 'axios';
// import getUserByEmail from '../controllers/users/getUserByEmail';

export default function useLikes({ prefetchedLikes, queryId }) {
	const { user, error, isLoading } = useUser();
	const [articleId, setArticleId] = useState(queryId);
	// const [isLiked, setIsLiked] = useState();

	const endpoint = () => {
		return `${process.env.NEXT_PUBLIC_HOST}/api/likes/${articleId}`;
	};

	const fetcher = (endpoint) =>
		axios.get(endpoint).then((res) => res.data.likes.likes);

	const {
		data: likes,
		mutate,
		error: swrError,
	} = useSWR(endpoint, fetcher, { fallbackData: prefetchedLikes });

	useEffect(() => {
		const pathName = typeof window !== 'undefined' && window.location.pathname;
		const article_id = typeof window !== 'undefined' && pathName.slice(6);
		setArticleId(article_id);
	}, []);

	const onLike = async (e) => {
		e.preventDefault();
		try {
			if (!user) throw new Error('You must be logged in to like this post.');
			// TODO: check to see if i need this below
			// const dbUser = await getUserByEmail({ email: user.email });
			// const res = await axios.put(
			// 	`${process.env.NEXT_PUBLIC_LOCALHOST}/api/likes/${articleId}`
			// );
			// if (res.data.likes.likes.includes(dbUser._id)) {
			// 	setIsLiked(true);
			// 	await mutate();
			// 	return res.data;
			// }
			// await mutate();
			// return res.data;
			await axios
				.put(`${process.env.NEXT_PUBLIC_HOST}/api/likes/${articleId}`)
				.then((res) => res.data);
			await mutate();
		} catch (error) {
			console.log(error.message);
		}
	};

	return {
		likes,
		onLike,
		// isLiked,
		isLoading: !swrError && !likes,
		isError: swrError ? true : false,
		swrError,
	};
}
