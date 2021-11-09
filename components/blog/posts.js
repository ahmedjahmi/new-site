import Link from 'next/link';
import Card from '../card';
import Date from '../date';
import styles from './blog.module.scss';
import capitalizeWord from '../../lib/utils/capitalizeWord';

function Posts({ articles }) {
	return (
		<section className={styles.posts}>
			{articles.map(({ _id, createdAt, title, user }, index) => {
				const firstName = capitalizeWord(user.firstName);
				const lastName = capitalizeWord(user.lastName);
				const authorName = firstName + ' ' + lastName;
				return (
					<Link key={index} href='/blog/[id]' as={`/blog/${_id}`}>
						<a>
							<Card>
								{title}
								<p className={styles.author}>written by {authorName}</p>
								<Date dateString={createdAt} />
							</Card>
						</a>
					</Link>
				);
			})}
		</section>
	);
}

export default Posts;
