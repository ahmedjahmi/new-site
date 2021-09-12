import dbConnect from '../dbConnect';
import Article from '../../models/Article';

export default async function getArticles(req, res) {
	try {
		await dbConnect();
		const articles = await Article.find({}, null, { sort: { createdAt: -1 } });
		// const articles = await unsortedArticles.sort((a, b) => {
		// 	if (a.createdAt < b.createdAt) {
		// 		return 1;
		// 	} else {
		// 		return -1;
		// 	}
		// });
		if (!req && !res) return articles;
		res.status(200).json({ success: true, articles: articles });
	} catch (error) {
		if (!req && !res) return error;
		res.status(400).json({ success: false, error: error });
	}
}
