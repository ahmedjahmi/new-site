import dbConnect from '../utils/dbConnect';
import Comment from '../../models/Comment';
import Article from '../../models/Article';
import getUserByEmail from './getUserByEmail';
import { getSession } from '@auth0/nextjs-auth0';

export default async function createComment(req, res) {
	try {
		// Check that user is logged in
		const session = getSession(req, res);
		if (!session)
			return res.status(400).json({ message: 'Need authorization.' });

		await dbConnect();

		const email = session.user.email;
		const dbUser = await getUserByEmail({ email: email });
		const { text, articleId } = req.body;
		const comment = new Comment({
			text,
			user: dbUser._id,
		});
		const commentId = await comment._id;
		await comment.save();

		await Article.findByIdAndUpdate(
			articleId,
			{
				$push: { comments: commentId },
			},
			{ new: true, useFindAndModify: false }
		);

		return res.status(200).send(comment);
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
}
