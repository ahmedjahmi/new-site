import createComment from '../../../lib/controllers/comments/createComment';
import deleteComment from '../../../lib/controllers/comments/deleteComment';

export default async function handler(req, res) {
	switch (req.method) {
		case 'POST':
			return createComment(req, res);
		// TODO:
		// case 'GET':
		//   return getComments(req, res);
		// case 'PUT':
		//   return updateComment(req, res);
		case 'DELETE':
			return deleteComment(req, res);
		default:
			return res.status(400).json({ message: 'Invalid method.' });
	}
}
