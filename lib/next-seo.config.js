import { siteTitle } from '../components/layout/layout';

export default {
	description:
		'Software Engineer in Brooklyn writing about anything and everything related to software.',
	openGraph: {
		type: 'website',
		locale: 'en_IE',
		url: 'https://www.ahmedjahmi.com',
		site_name: siteTitle,
	},
	twitter: {
		handle: '@jahmiamor',
		site: '@jahmiamor',
		cardType: 'summary_large_image',
	},
	additionalMetaTags: [
		{
			name: 'google-site-verification',
			content: 'Rq4JpMtjEKOqbnFAKNlvrO8-p5GvAOkpVdV7taTakPc',
		},
	],
	additionalLinkTags: [
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			href: '/favicon_io/apple-touch-icon.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			href: '/favicon_io/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			href: '/favicon_io/favicon-16x16.png',
		},
		{
			rel: 'manifest',
			href: '/favicon_io/site.webmanifest',
		},
	],
};
