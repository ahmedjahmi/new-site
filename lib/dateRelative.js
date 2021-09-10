import { formatDistanceToNowStrict, parseISO } from 'date-fns';

export default function distanceToNow(dateTime) {
	const parsedDateTime = parseISO(dateTime);
	return formatDistanceToNowStrict(parsedDateTime, {
		addSuffix: true,
	});
}
