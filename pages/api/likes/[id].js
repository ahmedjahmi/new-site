import getLikesByArticle from '../../../lib/controllers/getLikesByArticle';
import toggleLike from '../../../lib/controllers/toggleLike';

export default async function handler(req, res) {
	switch (req.method) {
		case 'PUT':
			return toggleLike(req, res);
		case 'GET':
			return getLikesByArticle({ req: req, res: res });
		default:
			return res.status(400).json({ message: 'Invalid method.' });
	}
}
