import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Button from '../button';

function ProfileForm({ profileForm, userId, formId }) {
	const router = useRouter();
	const [errors, setErrors] = useState({});
	const [file, setFile] = useState(null);
	const [message, setMessage] = useState('');

	const [form, setForm] = useState({
		firstName: profileForm.firstName,
		lastName: profileForm.lastName,
		username: profileForm.username,
	});

	const putData = async (form, file) => {
		let formData = new FormData();

		if (file) {
			formData.append('file', file);
		}

		for (const key in form) {
			formData.append(key, form[key]);
		}

		const endpoint = `/api/users/${userId}`;

		try {
			const res = await axios.put(endpoint, formData);
			if (res.statusText !== 'OK') {
				throw new Error(res.statusText);
			}
			router.push({
				pathname: '/[id]',
				query: { id: userId },
			});
		} catch (error) {
			setMessage('Failed to edit user.');
			console.log('Update user error: ', error.message);
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
		putData(form, file);
		console.log('handleSubmit file log: ', file);
	};

	return (
		<>
			<form id={formId} onSubmit={handleSubmit}>
				<label htmlFor='firstName'>First Name:</label>
				<input
					type='text'
					name='firstName'
					id='firstName'
					value={form.firstName}
					onChange={handleChange}
				/>

				<label htmlFor='lastName'>Last Name:</label>
				<input
					type='text'
					name='lastName'
					id='lastName'
					value={form.lastName}
					onChange={handleChange}
				/>

				<label htmlFor='username'>Username:</label>
				<input
					type='text'
					name='username'
					id='username'
					value={form.username}
					onChange={handleChange}
				/>

				<label htmlFor='profileImage'>Profile Image:</label>
				<input
					type='file'
					name='profileImage'
					id='profileImage'
					onChange={(e) => setFile(e.target.files[0])}
				/>
				<Button type='submit'>Submit</Button>
			</form>
		</>
	);
}

export default ProfileForm;
