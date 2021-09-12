import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useUser } from '@auth0/nextjs-auth0';
import axios from 'axios';

export default function useComments() {
	const { user, error, isLoading } = useUser();
	const [text, setText] = useState('');
	const [articleId, setArticleId] = useState();

	// const endpoint = `${process.env.NEXT_PUBLIC_LOCALHOST}/api/comments/${articleId}`;
	const endpoint = () => {
		return `${process.env.NEXT_PUBLIC_LOCALHOST}/api/comments/${articleId}`;
	};
	const fetcher = (endpoint) =>
		axios.get(endpoint).then((res) => res.data.comments.comments);

	const { data: comments, mutate, error: swrError } = useSWR(endpoint, fetcher);

	useEffect(() => {
		const pathName = window.location.pathname;
		const article_id = pathName.slice(6);
		setArticleId(article_id);
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			if (!user) throw new Error('You must be logged in to comment.');
			await axios
				.post(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/comments`, {
					text: text,
					articleId: articleId,
				})
				.then((res) => res.data);
			setText('');
			await mutate();
		} catch (error) {
			console.log(error.message);
		}
	};

	const onDelete = async (commentId) => {
		try {
			if (!user) throw new Error('You are not authorized.');
			await axios
				.delete(
					`${process.env.NEXT_PUBLIC_LOCALHOST}/api/comments/${commentId}`
				)
				.then((res) => res.data.data);
			await mutate();
		} catch (error) {
			console.log(error.message);
		}
	};

	return {
		text,
		setText,
		comments,
		onSubmit,
		onDelete,
		isLoading: !swrError && !comments,
		isError: swrError,
	};
}
