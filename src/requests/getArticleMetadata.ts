export default async function getArticleMetadata(
  articlePath: string
): Promise<{ title: string; description: string }> {
  const metadata = (await fetch(
    `${process.env.NEXT_ARTICLE_CDN_URL}/project/${process.env.NEXT_ARTICLE_PROJECT_KEY}/get-metadata/${articlePath}`,
    {
      cache: "force-cache",
    }
  ).then((res) => res.json())) as {
    title: string;
    description: string;
  };
  return {
    title: metadata.title,
    description: metadata.description,
  };
}
