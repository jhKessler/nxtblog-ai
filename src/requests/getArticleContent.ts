import { PostContent } from "../types";

export default async function getArticleContent(articlePath: string): Promise<PostContent> {
    const response = await fetch(
      `${process.env.NEXT_ARTICLE_CDN_URL}/project/${process.env.NEXT_ARTICLE_PROJECT_KEY}/get-content/${articlePath}`
    );
    return response.json() as Promise<PostContent>;
  }