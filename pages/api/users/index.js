import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import validateEmail from '../../../lib/validateEmail';

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const users = await User.find({}); /* find all users in db */
				// remove passwords from data
				const cleanedUsers = await users.map((user) => {
					user.password = null;
					return user;
				});
				res.status(200).json({ success: true, data: cleanedUsers });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
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

				const image = picture;
				const role = email != process.env.ADMIN_EMAIL ? 'user' : 'admin';

				const user = new User({
					email,
					auth_user_id: user_id,
					email_verified,
					auth_created_at: created_at,
					auth_updated_at: updated_at,
					auth_last_password_reset: last_password_reset,
					role: role,
					image_url: image,
					username: email,
				});

				const newUser = await user.save();

				return res.status(200).send(newUser);
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
