import '../styles/globals.scss';
import { DefaultSeo } from 'next-seo';
import SEO from '../lib/next-seo.config';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<DefaultSeo {...SEO} />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
