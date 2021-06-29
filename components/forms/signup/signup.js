import { useState } from 'react';
import { useRouter } from 'next/router';

const SignUpForm = ({ formId, userForm, forNewUser = true }) => {
	const router = useRouter();
	const contentType = 'application/json';
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState('');

	const [form, setForm] = useState({
		email: userForm.email,
		password: userForm.password,
		confirmPassword: userForm.confirmPassword,
	});

	const postData = async (form) => {
		try {
			const res = await fetch('api/users', {
				method: 'POST',
				headers: {
					Accept: contentType,
					'Content-Type': contentType,
				},
				body: JSON.stringify(form),
			});
			// Throw error with status code in case Fetch API req failed
			if (!res.ok) {
				throw new Error(res.status);
			}

			router.push('/');
		} catch (error) {
			setMessage('Failed to add user.');
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
		if (Object.keys(errs).length === 0) {
			postData(form);
		} else {
			setErrors({ errs });
		}
	};

	const formValidate = () => {
		let err = {};
		if (!form.email) err.email = 'Email is required';
		if (!form.password) err.password = 'Password is required';
		if (!form.confirmPassword) err.confirmPassword = 'Please confirm password';
		if (form.password !== form.confirmPassword)
			err.passwordMatch = 'Password must match Confirm Password';
		return err;
	};

	return (
		<>
			<form id={formId} onSubmit={handleSubmit}>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					name='email'
					value={form.email}
					onChange={handleChange}
					required
					autoComplete='email'
				/>

				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
					title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
					value={form.password}
					onChange={handleChange}
					required
					autoComplete='new-password'
				/>

				<label htmlFor='confirmPassword'>Confirm Password</label>
				<input
					type='password'
					name='confirmPassword'
					pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
					title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
					value={form.confirmPassword}
					onChange={handleChange}
					required
					autoComplete='new-password'
				/>

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

export default SignUpForm;
