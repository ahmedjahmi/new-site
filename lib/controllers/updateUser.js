import dbConnect from '../dbConnect';
import User from '../../models/User';
import { uploadProfileImage } from '../imageUpload';
import { getSession } from '@auth0/nextjs-auth0';
import formidable from 'formidable';
import getUserByEmail from './getUserByEmail';

export default async function updateUser(req, res) {
	try {
		await dbConnect();
		const session = getSession(req, res);
		const email = session.user.email;

		const dbUser = await getUserByEmail({ email: email });

		const userId = req.query.id;

		const isUser = dbUser._id == userId ? true : false;

		const isAdmin = dbUser.role == 'admin' ? true : false;

		if (!(isAdmin || isUser)) {
			res.status(403).json({
				success: false,
				message: 'You are not authorized to post articles.',
			});
		}

		const formData = await new Promise((resolve, reject) => {
			const form = new formidable();
			form.keepExtensions = true;
			form.parse(req, (err, fields, files) => {
				if (err) reject({ err });
				resolve({ err, fields, files });
			});
		});

		const { firstName, lastName, username } = formData.fields;

		const file = formData.files.file ? formData.files.file.path : null;

		const image_url = file ? await uploadProfileImage(file) : null;

		const updates = {
			firstName: firstName,
			lastName: lastName,
			username: username,
			...(file && { image_url: image_url }),
		};
		const user = await User.findByIdAndUpdate(userId, updates, {
			new: true,
			runValidators: true,
		});
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: 'Request did not return a user.' });
		}
		res.status(200).json({ success: true, data: user });

		// res.status(400).json({
		// 	success: false,
		// 	message: 'You do not have authorization to edit this user.',
		// });
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
}
