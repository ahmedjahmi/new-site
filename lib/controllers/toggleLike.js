import dbConnect from '../utils/dbConnect';
import Article from '../../models/Article';
import getUserByEmail from './getUserByEmail';
import { getSession } from '@auth0/nextjs-auth0';

export default async function toggleLike(req, res) {
	try {
		// Check that user is logged in
		const session = getSession(req, res);
		if (!session)
			return res.status(400).json({ message: 'Need authorization.' });

		await dbConnect();

		const email = session.user.email;
		const dbUser = await getUserByEmail({ email: email });
		const article = await Article.findById(req.query.id);
		const isLiked = article.likes.includes(dbUser._id) ? true : false;
		if (!isLiked) {
			await Article.findByIdAndUpdate(
				req.query.id,
				{
					$push: { likes: dbUser._id },
				},
				{ new: true, useFindAndModify: false }
			);
			const message = 'Article has been liked!';
			return res.status(200).json({ success: true, message: message });
		}
		await Article.findByIdAndUpdate(
			req.query.id,
			{
				$pull: { likes: dbUser._id },
			},
			{ new: true, useFindAndModify: false }
		);
		const message = 'Article has been unliked!';
		return res.status(200).json({ success: true, message: message });
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
}
