import mongoose from 'mongoose';

const model_name = 'Article';

const ArticleSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Please provide a title for this Article.'],
		},
		description: {
			type: String,
		},
		image_url: {
			type: String,
			required: [true, 'Please provide an image url for this Article'],
		},
		image_alt: {
			type: String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		by_artist: {
			type: String,
		},
		artist_url: {
			type: String,
		},
		content: {
			type: String,
			required: [true, 'Please provide content for this Article'],
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Like',
			},
		],
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Article ||
	mongoose.model(model_name, ArticleSchema);
