import Image from 'next/image';
import Date from '../date';
import styles from './blog.module.scss';
import capitalizeWord from '../../lib/utils/capitalizeWord';

function Hero({ title, imageSrc, artist_url, by_artist, createdAt, user }) {
	const getAuthorName = (user) => {
		if (typeof user.firstName == 'undefined') {
			return user.username;
		}
		const firstName = capitalizeWord(user.firstName);
		const lastName = capitalizeWord(user.lastName);
		return firstName + ' ' + lastName;
	};
	const authorName = getAuthorName(user);
	return (
		<div className={styles.hero}>
			<div className={styles.heroInner}>
				<div className={styles.heroArtContainer}>
					<div className={styles.heroArt}>
						<div className={styles.heroShot}>
							<Image
								src={imageSrc}
								width={1000}
								height={750}
								alt='apple shortcuts app'
							/>
						</div>
						<div className={styles.heroArtBy}>
							Art by <a href={artist_url}>{by_artist}</a>
						</div>
					</div>
				</div>
				<div className={styles.heroHeader}>
					<header>
						<h1 className={styles.heroTitle}>
							<span className={styles.spanUnderline}>{title}</span>
						</h1>
						<p className={styles.byLine}>by {authorName}</p>
						<div className={styles.dateText}>
							<Date dateString={createdAt} />
						</div>
					</header>
				</div>
			</div>
		</div>
	);
}

export default Hero;
