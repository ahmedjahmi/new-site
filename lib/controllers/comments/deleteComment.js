import dbConnect from '../../utils/dbConnect';
import Comment from '../../../models/Comment';
import getUserByEmail from '../users/getUserByEmail';
import { getSession } from '@auth0/nextjs-auth0';

export default async function deleteComment(req, res) {
	const session = getSession(req, res);
	if (!session) {
		return res.status(400).json({ message: 'You must be logged in.' });
	}

	const commentId = req.query.id;
	if (!commentId) {
		return res.status(400).json({ message: 'Missing parameter(s).' });
	}

	try {
		await dbConnect();

		const email = session.user.email;
		const dbUser = await getUserByEmail({ email: email });
		const isAdmin = dbUser.role == 'admin' ? true : false;

		const comment = await Comment.findById(commentId);
		const isAuthor =
			String(comment.user._id) == String(dbUser._id) ? true : false;

		if (isAuthor || isAdmin) {
			await Comment.findByIdAndDelete(commentId);
			return res.status(200).json({ success: true, data: {} });
		}
		return res.status(400).json({ message: 'Need authorization.' });
		// if (!isAdmin || !isAuthor) {
		// 	return res.status(400).json({ message: 'Need authorization.' });
		// }

		// if (isAdmin || isAuthor) {
		// 	await Comment.findByIdAndDelete(commentId);
		// 	return res.status(200).json({ success: true, data: {} });
		// }
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
}

// export default async function deleteComment(req, res) {
// 	const { comment } = req.body;
// 	if (!comment) {
// 		return res.status(400).json({ message: 'Missing parameter(s).' });
// 	}

// 	try {
// 		const session = getSession(req, res);
// 		if (!session) {
// 			return res
// 				.status(400)
// 				.json({ message: 'You must be logged in to do that.' });
// 		}

// 		await dbConnect();

// 		const email = session.user.email;
// 		const dbUser = await getUserByEmail({ email: email });
// 		const isAdmin = dbUser.role == 'admin' ? true : false;
// 		const isAuthor = dbUser._id == comment.user ? true : false;

// 		if (!isAdmin && !isAuthor) {
// 			return res.status(400).json({ message: 'Need authorization.' });
// 		}

// 		const deletedComment = await Comment.deleteOne({ _id: comment._id });
// 		return res.status(200).json({ success: true, data: {} });
// 	} catch (error) {
// 		res.status(400).json({ success: false, error: error.message });
// 	}
// }
