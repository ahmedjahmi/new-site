import getUsers from '../../../lib/controllers/users/getUsers';
import createUser from '../../../lib/controllers/users/createUser';
import getUserByEmail from '../../../lib/controllers/users/getUserByEmail';

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return getUsers(req, res);
		case 'POST':
			if (req.body.user_id) return createUser(req, res);
			return getUserByEmail({ req: req, res: res });
		default:
			res.status(400).json({ success: false, error: 'Method not allowed.' });
	}
}
