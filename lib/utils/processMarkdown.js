import remark from 'remark';
import html from 'remark-html';

export default async function processMarkdown(content) {
	const processedContent = await remark().use(html).process(content);
	const contentHtml = processedContent.toString();
	return {
		contentHtml,
	};
}
