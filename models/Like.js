import mongoose from 'mongoose';

const model_name = 'Like';

const LikeSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		article: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article',
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Like ||
	mongoose.model(model_name, CommentSchema);
