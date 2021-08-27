import dbConnect from '../../../lib/dbConnect';
import Article from '../../../models/Article';

export async function getArticles() {
	const unsortedArticles = await Article.find({});
	const articles = await unsortedArticles.sort((a, b) => {
		if (a.createdAt < b.createdAt) {
			return 1;
		} else {
			return -1;
		}
	});
	return articles;
}

export default async function handler(req, res) {
	const { method } = req;

	if (method !== 'GET') {
		return res
			.status(405)
			.json({ success: false, message: 'Method not allowed' });
	}

	try {
		await dbConnect();
		const articles = await getArticles();
		res.status(200).json({ success: true, articles: articles });
	} catch (error) {
		res.status(400).json({ success: false, error: error });
	}
}
