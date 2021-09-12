import getCommentsByArticle from '../../../lib/controllers/getCommentsByArticle';
import deleteComment from '../../../lib/controllers/deleteComment';

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return getCommentsByArticle({ req: req, res: res });
		case 'DELETE':
			return deleteComment(req, res);
		default:
			return res.status(400).json({ message: 'Invalid method.' });
	}
}
