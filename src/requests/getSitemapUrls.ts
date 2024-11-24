// Fetch functions
export default async function getSitemapJson() {
    const response = await fetch(
      `${process.env.NEXT_ARTICLE_CDN_URL}/project/${process.env.NEXT_ARTICLE_PROJECT_KEY}/get-sitemap`
    ).then((res) => res.json()) as {
        url: string;
        lastModified: string;
    }[];
    return response
  }
  