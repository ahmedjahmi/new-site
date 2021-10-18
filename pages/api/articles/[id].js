import getArticlePageData from '../../../lib/controllers/articles/getArticlePageData';

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return getArticlePageData({ req: req, res: res });
		default:
			return res.status(400).json({ message: 'Invalid method.' });
	}
}
