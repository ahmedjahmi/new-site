import dbConnect from '../dbConnect';
import User from '../../models/User';

export default async function deleteUser({ req, res, id }) {
	try {
		await dbConnect();

		const userId = req ? req.query.id : id;
		const deletedUser = await User.deleteOne({ _id: userId });
		if (!deletedUser) {
			return res.status(400).json({ success: false });
		}
		if (id) return {};
		res.status(200).json({ success: true, data: {} });
	} catch (error) {
		if (id) return error;
		res.status(400).json({ success: false, error: error.message });
	}
}
