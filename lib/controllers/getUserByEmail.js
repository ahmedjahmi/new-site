import dbConnect from '../utils/dbConnect';
import User from '../../models/User';

export default async function getUserByEmail({ req, res, email }) {
	try {
		await dbConnect();

		const userEmail = req ? req.body.email : email;
		const user = await User.findOne({ email: userEmail });

		if (email) return user;
		res.status(200).send(user);
	} catch (error) {
		if (email) return error;
		res.status(400).json({ success: false, error: error.message });
	}
}
