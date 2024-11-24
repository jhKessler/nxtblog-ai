// Fetch functions
export default async function getSitemapJson() {
    const endpoint = `${process.env.NEXT_ARTICLE_CDN_URL}/project/${process.env.NEXT_ARTICLE_PROJECT_KEY}/get-sitemap`
    const response = await fetch(
        endpoint,
        { cache: "no-cache" }
    ).then((res) => res.json()) as {
        url: string;
        lastModified: string;
    }[];
    return response
  }
  