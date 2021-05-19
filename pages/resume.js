import Head from 'next/head';
import Layout from '../components/layout/layout';
import pageStyles from '../styles/page.module.scss';
import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';

export default function Resume() {
	const myResume =
		'https://res.cloudinary.com/ds2pg7vex/image/upload/v1621435955/ahmed-jahmi-blog/Copy_of_resume_AhmedJahmi_3_j5dokq.png';
	const src = buildUrl(myResume, {
		cloud: {
			cloudName: 'ds2pg7vex',
		},
	});

	return (
		<Layout>
			<Head>
				<title>Ahmed Jahmi | Resume</title>
			</Head>
			<div className={pageStyles.resumePageContainer}>
				<div className={pageStyles.resumeContainer}>
					<Image src={src} width={3090} height={3999} layout='responsive' />
				</div>
			</div>
		</Layout>
	);
}
