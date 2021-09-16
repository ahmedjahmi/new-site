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
		email_verified: {
			type: Boolean,
			default: false,
		},
		auth_user_id: {
			type: String,
			unique: true,
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
		fullName: {
			type: String,
			trim: true,
		},
		username: {
			type: String,
			trim: true,
			lowercase: true,
			unique: true,
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
		auth_created_at: {
			type: Date,
		},
		auth_updated_at: {
			type: Date,
		},
		auth_last_password_reset: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.User || mongoose.model(model_name, UserSchema);
