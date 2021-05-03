import { siteTitle } from '../components/layout/layout';

export default {
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