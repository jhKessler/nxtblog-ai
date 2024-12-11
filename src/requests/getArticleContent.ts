import { PostContent } from "../types";

export default async function getArticleContent(
  articlePath: string
): Promise<PostContent> {
  const contentResponse = await fetch(
    `${process.env.NEXT_ARTICLE_CDN_URL}/project/${process.env.NEXT_ARTICLE_PROJECT_KEY}/get-content/${articlePath}`,
    {
      cache: "force-cache",
    }
  );
  if (!contentResponse.ok) {
    throw new Error("Content not found");
  }
  const content = (await contentResponse.json()) as PostContent;

  return content;
}
