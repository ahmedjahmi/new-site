import dbConnect from '../../utils/dbConnect';
import Article from '../../../models/Article';
// Comment model required to populate comments data from Article
import Comment from '../../../models/Comment';

export default async function getComments({ req, res, id }) {
	const articleId = req ? req.query.id : id;
	try {
		await dbConnect();
		const articleComments = await Article.findById(articleId).populate({
			path: 'comments',
			populate: { path: 'user' },
			options: { sort: { createdAt: -1 } },
		});
		const comments = articleComments ? articleComments : [];
		if (id) return comments;
		return res.status(200).json({ success: true, comments: comments });
	} catch (error) {
		if (id) return error;
		return res.status(400).json({ sucess: false, error: error.message });
	}
}
