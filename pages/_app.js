import '../styles/globals.scss';
import { DefaultSeo } from 'next-seo';
import SEO from '../lib/utils/next-seo.config';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserProvider } from '@auth0/nextjs-auth0';

import * as ga from '../lib/google-analytics';

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url) => {
			ga.pageView(url);
		};
		//When the component is mounted, subscribe to router changes
		//and log those page views
		router.events.on('routeChangeComplete', handleRouteChange);

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);
	return (
		<UserProvider>
			<DefaultSeo {...SEO} />
			<Component {...pageProps} />
		</UserProvider>
	);
}

export default MyApp;
