import dbConnect from '../utils/dbConnect';
import User from '../../models/User';
import Article from '../../models/Article';
import Rotation from '../../models/Rotation';
import { uploadCoverImage } from '../utils/imageUpload';
import { getSession } from '@auth0/nextjs-auth0';
import formidable from 'formidable';

export default async function createArticle(req, res) {
	try {
		await dbConnect();
		const session = getSession(req, res);
		const email = session.user.email;

		const dbUser = await User.findOne({ email: email });
		if (dbUser.role !== 'admin') {
			res.status(403).json({
				success: false,
				message: 'You are not authorized to post articles.',
			});
		}
		const formData = await new Promise((resolve, reject) => {
			const form = new formidable();
			form.keepExtensions = true;
			form.parse(req, (err, fields, files) => {
				if (err) reject({ err });
				resolve({ err, fields, files });
			});
		});

		const {
			title,
			description,
			image_alt,
			user,
			by_artist,
			artist_url,
			content,
			music_title,
			music_url,
			podcast_title,
			podcast_url,
			tv_title,
			tv_url,
			book_title,
			book_url,
		} = formData.fields;

		const file = formData.files.file.path;

		const image_url = await uploadCoverImage(file);

		const article = new Article({
			title,
			description,
			image_url: image_url,
			image_alt,
			user,
			by_artist,
			artist_url,
			content,
		});

		const articleId = await article._id;

		await article.save();

		const rotation = new Rotation({
			music_title,
			music_url,
			podcast_title,
			podcast_url,
			tv_title,
			tv_url,
			book_title,
			book_url,
			article: articleId,
		});

		await rotation.save();

		const data = {
			article: article,
			rotation: rotation,
		};
		return res.status(200).send(data);
	} catch (error) {
		res.status(400).json({ success: false, error: error.message });
	}
}
