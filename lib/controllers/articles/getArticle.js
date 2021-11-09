import dbConnect from '../../utils/dbConnect';
import Article from '../../../models/Article';
// comment import below needed to populate article comments
import Comment from '../../../models/Comment';

export default async function getArticle(id) {
	await dbConnect();
	const article = await Article.findById(id)
		.populate('comments')
		.populate('user');
	return article;
}
