// Fetch functions
export default async function getArticlePaths() {
  if (
    !process.env.NEXT_ARTICLE_PROJECT_KEY ||
    !process.env.NEXT_ARTICLE_CDN_URL
  ) {
    throw new Error(
      "NEXT_ARTICLE_PROJECT_KEY and NEXT_ARTICLE_CDN_URL must be set in your environment variables."
    );
  }
  const articlePaths = (await fetch(
    `${process.env.NEXT_ARTICLE_CDN_URL}/project/${process.env.NEXT_ARTICLE_PROJECT_KEY}/get-articles`
  ).then((res) => res.json())) as string[];
  if (!articlePaths) {
    console.error(
      "No articles found, check if you set NEXT_ARTICLE_PROJECT_KEY and NEXT_ARTICLE_CDN_URL correctly in your environment variables."
    );
    return [];
  }
  return articlePaths.map((articlePath) => ({
    articlePath,
  }));
}
