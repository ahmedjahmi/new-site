import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { hashPassword, validatePassword } from '../../../lib/bcrypt';
import { profileImageUpload } from '../../../lib/imageUpload';
import validateEmail from '../../../lib/validateEmail';

export default async function handler(req, res) {
	const { method } = req;
	const defaultImage =
		'https://res.cloudinary.com/ds2pg7vex/image/upload/v1624895144/ahmed-jahmi-blog/profile-images/chappellePrince_mvmwpi.jpg';

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
				console.log(cleanedUsers);
				res.status(200).json({ success: true, data: cleanedUsers });
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
				validateEmail(email);
				const hashedPassword = await hashPassword(password);
				const image = await profileImageUpload(image_url || defaultImage);
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
