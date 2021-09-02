import dbConnect from '../dbConnect';
import getArticle from './getArticle';
import getRotation from './getRotation';

export default async function getArticlePageData({ req, res, id }) {
	const articleId = req ? req.query.id : id;
	try {
		await dbConnect();
		const article = await getArticle(articleId);
		const rotation = await getRotation(articleId);
		const data = {
			article,
			rotation,
		};
		if (id) return data;
		res.status(200).json({ success: true, data: data });
	} catch (error) {
		if (!req && !res) return console.log(error);
		res.status(400).json({ success: false, error: error.message });
	}
}
