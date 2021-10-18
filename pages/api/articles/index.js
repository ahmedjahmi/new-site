import createArticle from '../../../lib/controllers/articles/createArticle';
import getArticles from '../../../lib/controllers/articles/articles/getArticles';

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	switch (req.method) {
		case 'POST':
			return createArticle(req, res);
		case 'GET':
			return getArticles(req, res);
		// TODO:
		// case 'PUT':
		//   return updateArticle(req, res);
		// case 'DELETE':
		//   return deleteArticle(req, res);
		default:
			return res.status(400).json({ message: 'Invalid method.' });
	}
}
