import dbConnect from '../dbConnect';
import User from '../../models/User';
import validateEmail from '../validateEmail';

export default async function createUser(req, res) {
	try {
		await dbConnect();
		const {
			email,
			user_id,
			email_verified,
			picture,
			created_at,
			updated_at,
			last_password_reset,
		} = req.body;

		validateEmail(email);

		const role = email != process.env.ADMIN_EMAIL ? 'user' : 'admin';

		const user = new User({
			email,
			auth_user_id: user_id,
			email_verified,
			auth_created_at: created_at,
			auth_updated_at: updated_at,
			auth_last_password_reset: last_password_reset,
			role: role,
			image_url: picture,
			username: email,
		});

		const newUser = await user.save();
		return res.status(200).send(newUser);
	} catch (error) {
		res.status(400).json({ success: false, error: error });
	}
}