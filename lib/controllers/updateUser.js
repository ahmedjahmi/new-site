import dbConnect from '../dbConnect';
import User from '../../models/User';

export default async function updateUser({ req, res, id }) {
	try {
		await dbConnect();

		const userId = req ? req.query.id : id;
		const user = await User.findByIdAndUpdate(userId, req.body, {
			new: true,
			runValidators: true,
		});
		if (!user) {
			return res.status(400).json({ success: false });
		}
		if (id) return user;
		res.status(200).json({ success: true, data: user });
	} catch (error) {
		if (id) return error;
		res.status(400).json({ success: false, error: error.message });
	}
}
