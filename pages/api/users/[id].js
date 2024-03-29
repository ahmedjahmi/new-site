import getUserById from '../../../lib/controllers/users/getUserById';
import updateUser from '../../../lib/controllers/users/updateUser';
import deleteUser from '../../../lib/controllers/users/deleteUser';

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return getUserById({ req: req, res: res });
		case 'PUT':
			return updateUser(req, res);
		case 'DELETE':
			return deleteUser({ req: req, res: res });
		default:
			res.status(400).json({ success: false });
	}
}
