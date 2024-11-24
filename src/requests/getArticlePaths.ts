// Fetch functions
export default async function getArticlePaths() {
    const response = await fetch(
      `${process.env.NEXT_ARTICLE_CDN_URL}/project/${process.env.NEXT_ARTICLE_PROJECT_KEY}/get-articles`
    ).then((res) => res.json()) as string[];
    return response.map((articlePath) => ({ articlePath }));
  }
  