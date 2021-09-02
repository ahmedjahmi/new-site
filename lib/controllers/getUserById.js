import dbConnect from '../dbConnect';
import User from '../../models/User';

export default async function getUserById({ req, res, id }) {
	try {
		await dbConnect();

		const userId = req ? req.query.id : id;
		const user = await User.findById(userId);

		if (id) return user;
		res.status(200).send(user);
	} catch (error) {
		if (id) return error;
		res.status(400).json({ success: false, error: error });
	}
}
