import Image from 'next/image';
import styles from './blog.module.scss';
import Container from '../container';

function Article({ contentHtml, authorImgSrc }) {
	return (
		<Container>
			<article>
				<div dangerouslySetInnerHTML={{ __html: contentHtml }} />
				<div className={styles.authorInfo}>
					<div className={styles.authorText}>
						by{' '}
						<a href='https://twitter.com/jahmiamor' target='_blank'>
							Ahmed Jahmi
						</a>
					</div>
					<Image
						src={authorImgSrc}
						width={32}
						height={32}
						className={styles.borderCircle}
						alt='Ahmed Jahmi'
					/>
				</div>
			</article>
		</Container>
	);
}

export default Article;
