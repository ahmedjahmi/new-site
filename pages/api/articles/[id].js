import dbConnect from '../../../lib/dbConnect';
import Article from '../../../models/Article';
import Rotation from '../../../models/Rotation';

export async function getArticle(id) {
	const article = await Article.findById(id);
	return article;
}
export async function getRotation(id) {
	const rotation = await Rotation.findOne({ article: id });
	return rotation;
}

export async function getArticlePageData(id) {
	const article = await getArticle(id);
	const rotation = await getRotation(id);
	const data = {
		article: article,
		rotation: rotation,
	};
	return data;
}

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
		const data = await getArticlePageData(id);
		if (!data) {
			return res
				.status(400)
				.json({ success: false, message: 'This article does not exist.' });
		}
		res.status(200).json({ success: true, data: data });
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
}
