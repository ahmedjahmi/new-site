import dbConnect from '../utils/dbConnect';
import Article from '../../models/Article';

export default async function getArticle(id) {
	await dbConnect();
	const article = await Article.findById(id).populate('comments');
	return article;
}
