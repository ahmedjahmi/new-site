import Link from 'next/link';
import Card from '../card';
import Date from '../date';
import styles from './blog.module.scss';

function Posts({ articles }) {
	return (
		<section className={styles.posts}>
			{articles.map(({ _id, createdAt, title }) => (
				<Link href='/blog/[id]' as={`/blog/${_id}`}>
					<a>
						<Card key={_id}>
							{title}
							<p className={styles.author}>written by Author</p>
							<Date dateString={createdAt} />
						</Card>
					</a>
				</Link>
			))}
		</section>
	);
}

export default Posts;
