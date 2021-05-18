import styles from './share.module.scss';
import {
	TwitterShareButton,
	TwitterIcon,
	FacebookShareButton,
	FacebookIcon,
	FacebookShareCount,
	LinkedinShareButton,
	LinkedinIcon,
	EmailShareButton,
	EmailIcon,
} from 'react-share';

export default function Share({ blogPostUrl, title, twitterHandle, size }) {
	const emailBody = 'Check out this blog post!';
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
						<TwitterIcon
							size={size}
							round
							bgStyle={{ fill: '#550000' }}
							iconFillColor='#ffcccc'
						/>
					</TwitterShareButton>
					<FacebookShareButton url={blogPostUrl}>
						<FacebookIcon
							size={size}
							round
							bgStyle={{ fill: '#550000' }}
							iconFillColor='#ffcccc'
						/>
					</FacebookShareButton>
					<FacebookShareCount url={blogPostUrl} />
					<LinkedinShareButton
						url={blogPostUrl}
						title={title}
						source='https://www.ahmedjahmi.com'
					>
						<LinkedinIcon
							size={size}
							round
							bgStyle={{ fill: '#550000' }}
							iconFillColor='#ffcccc'
						/>
					</LinkedinShareButton>
					<EmailShareButton subject={title} body={emailBody}>
						<EmailIcon
							size={size}
							round
							bgStyle={{ fill: '#550000' }}
							iconFillColor='#ffcccc'
						/>
					</EmailShareButton>
				</div>
			</div>
		</>
	);
}
