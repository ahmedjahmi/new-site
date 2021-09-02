import getUsers from '../../../lib/controllers/getUsers';
import createUser from '../../../lib/controllers/createUser';
import getUserByEmail from '../../../lib/controllers/getUserByEmail';

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return getUsers(req, res);
		case 'POST':
			if (req.body.created_at) return createUser(req, res);
			return getUserByEmail({ req: req, res: res });
		default:
			res.status(400).json({ success: false, error: 'Method not allowed.' });
	}
}
