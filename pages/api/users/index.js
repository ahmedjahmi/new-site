import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { hashPassword, validatePassword } from '../../../lib/bcrypt';
import imageUpload from '../../../lib/imageUpload';

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const users = await User.find({}); /* find all users in db */
				res.status(200).json({ success: true, data: users });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const {
					email,
					password,
					firstName,
					lastName,
					username,
					role,
					image_url,
				} = req.body;
				const hashedPassword = await hashPassword(password);
				const image = await imageUpload(image_url);
				const user = new User({
					email,
					password: hashedPassword,
					role: role || 'user',
					firstName,
					lastName,
					username,
					image_url: image,
				});
				const newUser = await user.save();
				return res.status(200).send(newUser);
			} catch (error) {
				res.status(400).json({ success: false });
			}
	}
}
