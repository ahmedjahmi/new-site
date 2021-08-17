import dbConnect from '../../../lib/dbConnect';
import Article from '../../../models/Article';
import Rotation from '../../../models/Rotation';

export default async function handler(req, res) {
	const {
		method,
		query: { id },
	} = req;

	if (method !== 'GET') {
		return res
			.status(405)
			.json({ success: false, message: 'Method not allowed' });
	}

	await dbConnect();

	try {
		const article = await Article.findById(id);
		const rotation = await Rotation.findOne({ article: id });
		if (!article) {
			return res
				.status(400)
				.json({ success: false, message: 'This article does not exist.' });
		}
		const data = {
			article: article,
			rotation: rotation,
		};
		res.status(200).json({ success: true, data: data });
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
}
