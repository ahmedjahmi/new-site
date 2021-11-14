import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ArticleForm = ({ formId, articleForm, forNewArticle = true }) => {
	// TODO: utilize forNewArticle to handle requests for updates to existing article
	const router = useRouter();
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState('');
	const [file, setFile] = useState();

	const [form, setForm] = useState({
		title: articleForm.title,
		description: articleForm.description,
		image_alt: articleForm.image_alt,
		user: articleForm.user,
		by_artist: articleForm.by_artist,
		artist_url: articleForm.artist_url,
		content: articleForm.content,
		music_title: articleForm.music_title,
		music_url: articleForm.music_url,
		podcast_title: articleForm.podcast_title,
		podcast_url: articleForm.podcast_url,
		tv_title: articleForm.tv_title,
		tv_url: articleForm.tv_url,
		book_title: articleForm.book_title,
		book_url: articleForm.book_url,
	});

	const postData = async (form, file) => {
		let formData = new FormData();

		// Add image file to formData
		formData.append('file', file);

		// Add remaining fields in form to formData
		for (const key in form) {
			formData.append(key, form[key]);
		}

		const endpoint = '/api/articles/';

		try {
			const res = await axios.post(endpoint, formData);
			// Throw error with status code in case axios req failed
			if (res.statusText !== 'OK') {
				throw new Error(res.statusText);
			}
			const articleId = res.data.article._id;
			return articleId;
			// router.push({
			// 	pathname: '/blog/[id]',
			// 	query: { id: articleId },
			// });
		} catch (error) {
			setMessage('Failed to create new article.');
		}
	};

	const handleChange = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errs = formValidate();
		let articleId;
		if (Object.keys(errs).length === 0) {
			articleId = postData(form, file);
			return articleId;
		} else {
			setErrors({ errs });
		}
	};

	const formValidate = () => {
		let err = {};
		if (!form.title) err.title = 'Title is required';
		if (!form.description) err.description = 'Description is required';
		if (!file) err.file = 'Image file upload is required';
		if (!form.image_alt) err.image_alt = 'Image alt description is required';
		if (!form.user) err.user = 'User is required';
		if (!form.by_artist) err.by_artist = 'By Artist is required';
		if (!form.artist_url) err.artist_url = 'Artist URL is required';
		//TODO: test form validation & submission without content first
		// then uncomment, and test content submission after markdown
		// conversion is handled
		// if (!form.content) err.content = 'Content is required'
		if (!form.music_title) err.music_title = 'Music title is required';
		if (!form.music_url) err.music_url = 'Music url is required';
		if (!form.podcast_title) err.podcast_title = 'Podcast title is required';
		if (!form.podcast_url) err.podcast_url = 'Podcast url is required';
		if (!form.tv_title) err.tv_title = 'TV title is required';
		if (!form.tv_url) err.tv_url = 'TV url is required';
		if (!form.book_title) err.book_title = 'Book title is required';
		if (!form.book_url) err.book_url = 'Book url is required';
		return err;
	};

	return (
		<>
			<form
				id={formId}
				onSubmit={() => {
					let articleId = handleSubmit();
					router.push({
						pathname: '/blog/[id]',
						query: { id: articleId },
					});
				}}
			>
				<label>
					Title:
					<input
						type='text'
						name='title'
						value={form.title}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Description:
					<input
						type='text'
						name='description'
						value={form.description}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Cover Image:
					<input
						type='file'
						name='file'
						onChange={(e) => setFile(e.target.files[0])}
					/>
				</label>

				<label>
					Image Alt Text:
					<input
						type='text'
						name='image_alt'
						value={form.image_alt}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					User:
					<input
						type='text'
						name='user'
						value={form.user}
						onChange={handleChange}
						required
						disabled
					/>
				</label>

				<label>
					Artist:
					<input
						type='text'
						name='by_artist'
						value={form.by_artist}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Artist URL:
					<input
						type='text'
						name='artist_url'
						value={form.artist_url}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Content:
					<textarea
						name='content'
						value={form.content}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Music Title:
					<input
						type='text'
						name='music_title'
						value={form.music_title}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Music URL:
					<input
						type='text'
						name='music_url'
						value={form.music_url}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Podcast Title:
					<input
						type='text'
						name='podcast_title'
						value={form.podcast_title}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Podcast URL:
					<input
						type='text'
						name='podcast_url'
						value={form.podcast_url}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					TV Title:
					<input
						type='text'
						name='tv_title'
						value={form.tv_title}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					TV URL:
					<input
						type='text'
						name='tv_url'
						value={form.tv_url}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Book Title:
					<input
						type='text'
						name='book_title'
						value={form.book_title}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Book URL:
					<input
						type='text'
						name='book_url'
						value={form.book_url}
						onChange={handleChange}
						required
					/>
				</label>

				<button type='submit' className='btn'>
					Submit
				</button>
			</form>
			<p>{message}</p>
			<div>
				{Object.keys(errors).map((err, index) => (
					<li key={index}>{err}</li>
				))}
			</div>
		</>
	);
};

export default ArticleForm;
