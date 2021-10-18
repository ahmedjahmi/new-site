import getComments from '../../../lib/controllers/comments/getComments';
import deleteComment from '../../../lib/controllers/comments/deleteComment';

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return getComments({ req: req, res: res });
		case 'DELETE':
			return deleteComment(req, res);
		default:
			return res.status(400).json({ message: 'Invalid method.' });
	}
}
