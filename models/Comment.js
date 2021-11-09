import mongoose from 'mongoose';

const model_name = 'Comment';

const CommentSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: [true, 'Please provide text for this Comment.'],
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Comment ||
	mongoose.model(model_name, CommentSchema);
