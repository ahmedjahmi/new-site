import dbConnect from '../dbConnect';
import Article from '../../models/Article';
// Comment model required to populate comments from Article
import Comment from '../../models/Comment';

export default async function getCommentsByArticle({ req, res, id }) {
	const articleId = req ? req.query.id : id;
	try {
		await dbConnect();
		const comments = await Article.findById(articleId).populate({
			path: 'comments',
			populate: { path: 'user' },
		});

		if (id) return comments;
		return res.status(200).json({ success: true, comments: comments });
	} catch (error) {
		if (id) return error;
		return res.status(400).json({ sucess: false, error: error.message });
	}
}
