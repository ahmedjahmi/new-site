import getUserById from '../../../lib/controllers/getUserById';
import updateUser from '../../../lib/controllers/updateUser';
import deleteUser from '../../../lib/controllers/deleteUser';

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return getUserById({ req: req, res: res });
		case 'PUT':
			return updateUser({ req: req, res: res });
		case 'DELETE':
			return deleteUser({ req: req, res: res });
		default:
			res.status(400).json({ success: false });
	}
}
