import User from '../../models/User';

export default async function validateEmail(email) {
	const users = await User.find({ email: email });
	if (users.length > 0) {
		throw new Error('Invalid email');
	}
}
