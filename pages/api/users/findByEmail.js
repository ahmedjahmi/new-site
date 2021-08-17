import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	if (method != 'POST') {
		res.status(400).json({ success: false });
	}
	try {
		const { email } = req.body;
		const user = await User.findOne({ email: email });
		return res.status(200).send(user);
	} catch (error) {
		res.status(400).json({ success: false, error: error });
	}
}
