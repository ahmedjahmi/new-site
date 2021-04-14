import styles from './share.module.scss';
import {
	TwitterShareButton,
	TwitterIcon,
	FacebookShareButton,
	FacebookIcon,
	FacebookShareCount,
	LinkedinShareButton,
	LinkedinIcon,
} from 'react-share';

export default function Share({ blogPostUrl, title, twitterHandle, size }) {
	return (
		<>
			<div className={styles.shareContainer}>
				<p>
					<span>Was this useful?</span> Share what you've read :)
				</p>
				<div className={styles.shareLinkContainer}>
					<TwitterShareButton
						url={blogPostUrl}
						title={title}
						via={twitterHandle}
					>
						<TwitterIcon size={size} round />
					</TwitterShareButton>
					<FacebookShareButton url={blogPostUrl}>
						<FacebookIcon size={size} round />
					</FacebookShareButton>
					<FacebookShareCount url={blogPostUrl} />
					<LinkedinShareButton
						url={blogPostUrl}
						title={title}
						source='https://www.ahmedjahmi.com'
					>
						<LinkedinIcon size={size} round />
					</LinkedinShareButton>
				</div>
			</div>
		</>
	);
}
