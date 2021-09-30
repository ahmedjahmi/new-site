import { parseISO, format } from 'date-fns';
import styles from './date.module.scss';

export default function Date({ dateString }) {
	const date = parseISO(dateString);
	return (
		<small className={styles.date}>
			<time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
		</small>
	);
}
