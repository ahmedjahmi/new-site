import dbConnect from '../../utils/dbConnect';
import User from '../../../models/User';
import Comment from '../../../models/Comment';
import Article from '../../../models/Article';
import { getSession } from '@auth0/nextjs-auth0';

export default async function deleteUser({ req, res, id }) {
	try {
		await dbConnect();
		const session = getSession(req, res);
		if (session) {
			const email = session.user.email;

			const dbUser = await User.findOne({ email: email });
			const isUser = dbUser.email == email ? true : false;
			const isAdmin = dbUser.role == 'admin' ? true : false;

			if (isUser || isAdmin) {
				const userId = req ? req.query.id : id;
				await User.deleteOne({ _id: userId }, { new: true });

				await Article.updateMany({}, { $pull: { comments: { user: userId } } });
				await Comment.deleteMany({ user: userId });

				if (id) return {};
				res.status(200).json({ success: true, data: {} });
			}
		}
		return res.status(400).json({ message: 'Need authorization.' });
	} catch (error) {
		if (id) return error;
		res.status(400).json({ success: false, error: error.message });
	}
}
