import dbConnect from '../utils/dbConnect';
import Article from '../../models/Article';

export default async function getLikesByArticle({ req, res, id }) {
	const articleId = req ? req.query.id : id;
	try {
		await dbConnect();
		const articleLikes = await Article.findById(articleId, {
			likes: 1,
			_id: 0,
		});
		const likes = articleLikes ? articleLikes : [];
		if (id) return likes;
		return res.status(200).json({ success: true, likes: likes });
	} catch (error) {
		if (id) return error;
		return res.status(400).json({ success: true, error: error.message });
	}
}
