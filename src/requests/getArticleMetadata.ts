export default async function getArticleMetadata(articlePath: string): Promise<{ title: string; description: string }> {
    const response = await fetch(
      `${process.env.NEXT_ARTICLE_CDN_URL}/project/${process.env.NEXT_ARTICLE_PROJECT_KEY}/get-metadata/${articlePath}`
    );
    return response.json() as Promise<{ title: string; description: string }>;
  }