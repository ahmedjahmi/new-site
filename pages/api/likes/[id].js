import getLikes from '../../../lib/controllers/likes/getLikes';
import toggleLike from '../../../lib/controllers/likes/toggleLike';

export default async function handler(req, res) {
	switch (req.method) {
		case 'PUT':
			return toggleLike(req, res);
		case 'GET':
			return getLikes({ req: req, res: res });
		default:
			return res.status(400).json({ message: 'Invalid method.' });
	}
}
