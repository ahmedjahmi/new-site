import RotationItem from './rotationItem';
import Container from '../container';
import capitalizeWord from '../../lib/utils/capitalizeWord';
import styles from './rotation.module.scss';

export default function Rotation({ rotation }) {
	const musicObj = {
		music: {
			title: rotation.music_title,
			url: rotation.music_url,
		},
	};
	const podcastObj = {
		podcast: {
			title: rotation.podcast_title,
			url: rotation.podcast_url,
		},
	};
	const tvObj = {
		tv: {
			title: rotation.tv_title,
			url: rotation.tv_url,
		},
	};
	const bookObj = {
		book: {
			title: rotation.book_title,
			url: rotation.book_url,
		},
	};

	const rotationList = [musicObj, podcastObj, tvObj, bookObj];

	const rotationItems = rotationList.map((item, index) => {
		const rotationType = Object.keys(item)[0];
		const url = item[rotationType]['url'];
		const title = item[rotationType]['title'];
		const capitalizedRotationType =
			rotationType == 'tv' ? 'TV' : capitalizeWord(rotationType);
		return (
			<RotationItem
				key={index}
				rotationType={capitalizedRotationType}
				url={url}
				title={title}
			/>
		);
	});

	return (
		<Container>
			<div className={styles.RotationList}>
				<h3 className={styles.onRotation}>
					<span>Rotation</span>
				</h3>
				{rotationItems}
			</div>
		</Container>
	);
}
