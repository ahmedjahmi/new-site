import dbConnect from '../dbConnect';
import User from '../../models/User';

export default async function getUsers(req, res) {
	try {
		await dbConnect();

		const users = await User.find({});

		res.status(200).json({ success: true, data: users });
	} catch (error) {
		res.status(400).json({ success: false, error: error });
	}
}
