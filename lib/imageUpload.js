import { v2 as cloudinary } from 'cloudinary';

const options = {
	folder: process.env.CLOUDINARY_PROFILE_IMAGES_FOLDER,
};

export default async function imageUpload(file) {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});

	const image = await cloudinary.uploader.upload(file, options);
	return image.url;
}
