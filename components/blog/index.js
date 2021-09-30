import Container from '../container';
import Heading from '../heading';
import Posts from './posts';

function Blog({ articles }) {
	return (
		<Container>
			<Heading size='h1'>Blog</Heading>
			{/* TODO: add profile page and field edit for name
          populate article.user to get article.user.name
          use name value for author prop in Articles component
        */}
			<Posts articles={articles} />
		</Container>
	);
}

export default Blog;
