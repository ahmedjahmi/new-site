import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

function ProfileForm({ profileForm, userId, formId }) {
	const router = useRouter();
	const [errors, setErrors] = useState({});
	const [file, setFile] = useState(null);
	const [message, setMessage] = useState('');

	const [form, setForm] = useState({
		firstName: profileForm.firstName,
		lastName: profileForm.lastName,
		// fullName: fullName,
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
				<label>
					First Name
					<input
						type='text'
						name='firstName'
						value={form.firstName}
						onChange={handleChange}
					/>
				</label>

				<label>
					Last Name
					<input
						type='text'
						name='lastName'
						value={form.lastName}
						onChange={handleChange}
					/>
				</label>

				<label>
					Username
					<input
						type='text'
						name='username'
						value={form.username}
						onChange={handleChange}
					/>
				</label>

				<label>
					Profile Image
					<input
						type='file'
						name='file'
						onChange={(e) => setFile(e.target.files[0])}
					/>
				</label>
				<button type='submit'>Submit</button>
			</form>
		</>
	);
}

export default ProfileForm;
