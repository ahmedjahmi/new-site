import Head from 'next/head';
import Layout from '../components/layout/layout';
import pageStyles from '../styles/page.module.scss';
import SignUpForm from '../components/forms/signup/signup';

export default function SignUp() {
	const userForm = {
		email: '',
		password: '',
		confirmPassword: '',
	};
	return (
		<Layout>
			<Head>
				<title>Ahmed Jahmi | Signup</title>
			</Head>
			<div className={pageStyles.signupPageContainer}>
				<div className={pageStyles.signupFormContainer}>
					<SignUpForm formId='signup-form' userForm={userForm} />
				</div>
			</div>
		</Layout>
	);
}
