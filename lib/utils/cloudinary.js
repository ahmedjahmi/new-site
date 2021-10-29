import { buildUrl } from 'cloudinary-build-url';

const cloudName = 'ds2pg7vex';
const metaWidth = 1200;
const metaHeight = 628;

function getImageSrc(imageUrl) {
	const src = buildUrl(imageUrl, {
		cloud: {
			cloudName: cloudName,
		},
	});
	return src;
}

function getImageMetaSrc(imageUrl) {
	const metaSrc = buildUrl(imageUrl, {
		cloud: {
			cloudName: cloudName,
		},
		transformations: {
			width: metaWidth,
			height: metaHeight,
		},
	});
	return metaSrc;
}

function getAuthorImage(imageUrl) {
	const authorImageSrc = buildUrl(imageUrl, {
		cloud: {
			cloudName: cloudName,
		},
	});
	return authorImageSrc;
}

module.exports = {
	getImageSrc,
	getImageMetaSrc,
	getAuthorImage,
};
