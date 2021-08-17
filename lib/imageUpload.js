import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadProfileImage(file) {
	const options = {
		folder: process.env.CLOUDINARY_PROFILE_IMAGES_FOLDER,
	};

	const image = await cloudinary.uploader.upload(file, options);
	return image.url;
}

export async function uploadCoverImage(file) {
	const options = {
		folder: process.env.CLOUDINARY_COVER_IMAGES_FOLDER,
	};

	const image = await cloudinary.uploader.upload(file, options);
	return image.url;
}

export async function articleImageUpload(file) {
	const options = {
		folder: process.env.CLOUDINARY_ARTICLE_IMAGES_FOLDER,
	};

	const image = await cloudinary.uploader.upload(file, options);
	return image.url;
}
