import '../styles/globals.scss';
import { DefaultSeo } from 'next-seo';
import SEO from '../lib/next-seo.config';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'next-auth/client';

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
		<Provider session={pageProps.session}>
			<DefaultSeo {...SEO} />
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
