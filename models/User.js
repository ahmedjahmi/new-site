import mongoose from 'mongoose';

const model_name = 'User';

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			trim: true,
			lowercase: true,
			required: [true, 'Please provide a email for this User.'],
		},
		firstName: {
			type: String,
			trim: true,
			lowercase: true,
		},
		lastName: {
			type: String,
			trim: true,
			lowercase: true,
		},
		username: {
			type: String,
			trim: true,
			lowercase: true,
			unique: true,
		},
		password: {
			type: String,
			minlength: 6,
			trim: true,
			required: [true, 'Please provide a password for this User.'],
		},
		role: {
			type: String,
			default: 'user',
			enum: ['user', 'admin'],
		},
		accessToken: {
			type: String,
		},
		image_url: {
			type: String,
		},
		articles: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article',
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.User || mongoose.model(model_name, UserSchema);
