import dbConnect from '../dbConnect';
import Article from '../../models/Article';

export default async function getArticle(id) {
	await dbConnect();
	const article = await Article.findById(id);
	return article;
}
