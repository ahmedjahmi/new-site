import Image from 'next/image';
import styles from './avatar.module.scss';

function Avatar({ size, src, altInfo }) {
	return (
		<div className={styles.avatar}>
			<Image
				src={src}
				width={size}
				height={size}
				layout='responsive'
				className={styles.avatarImage}
				alt={altInfo}
			/>
		</div>
	);
}

export default Avatar;
