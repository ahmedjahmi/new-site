import mongoose from 'mongoose';

const model_name = 'Rotation';

const RotationSchema = new mongoose.Schema(
	{
		article: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article',
		},
		music_title: {
			type: String,
		},
		music_url: {
			type: String,
		},
		podcast_title: {
			type: String,
		},
		podcast_url: {
			type: String,
		},
		tv_title: {
			type: String,
		},
		tv_url: {
			type: String,
		},
		book_title: {
			type: String,
		},
		book_url: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Rotation ||
	mongoose.model(model_name, RotationSchema);
