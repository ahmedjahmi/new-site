import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export async function getUserById(id) {
	const user = await User.findById(id);
	return user;
}

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const user = await getUserById(id);
				if (!user) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: user });
			} catch (error) {
				res.status(400).json({ success: false, error: error.message });
			}
			break;

		case 'PUT':
			try {
				const user = await User.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});
				if (!user) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: user });
			} catch (error) {
				res.status(400).json({ success: false, error: error.message });
			}
			break;

		case 'DELETE':
			try {
				const deletedUser = await User.deleteOne({ _id: id });
				if (!deletedUser) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: {} });
			} catch (error) {
				res.status(400).json({ success: false, error: error.message });
			}
			break;

		default:
			res.status(400).json({ success: false });
	}
}
