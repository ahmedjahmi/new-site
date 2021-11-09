import Hero from './hero';
import Social from './social';
import Rotation from '../rotation';
import Article from './article';

function Post({
	article,
	rotation,
	articleContent,
	dbUser,
	isAdmin,
	queryId,
	imageSrc,
	authorImgSrc,
	blogPostUrl,
}) {
	return (
		<>
			<Hero
				title={article.title}
				imageSrc={imageSrc}
				artist_url={article.artist_url}
				by_artist={article.by_artist}
				createdAt={article.createdAt}
				user={article.user}
			/>

			<Article
				contentHtml={articleContent.contentHtml}
				authorImgSrc={authorImgSrc}
			/>
			<Social
				dbUser={dbUser}
				isAdmin={isAdmin}
				likes={article.likes}
				queryId={queryId}
				blogPostUrl={blogPostUrl}
				title={article.title}
				comments={article.comments}
			/>
			<Rotation rotation={rotation} />
		</>
	);
}

export default Post;
