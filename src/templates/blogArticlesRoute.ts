

export const BLOG_ARTICLES_ROUTE_CODE = `import { BlogPost } from "nxtblog-ai/dist/components";
import { type PostContent } from "nxtblog-ai/dist/types";

export const revalidate = false;
export const dynamicParams = true;

export async function generateStaticParams() {
    const articlePaths = await fetch(
        \`\${process.env.NEXT_ARTICLE_CDN_URL}/project/\${process.env.NEXT_ARTICLE_PROJECT_KEY}/get-articles\`
    ).then((res) =>
        res.json()
    ) as string[];
    return articlePaths.map((articlePath) => ({
        params: {
            articlePath
        }
    }));
}

export default async function Page({
    params,
}: {
    params: Promise<{ articlePath: string; }>;
}) {
    const { articlePath } = await params;
    const contentResponse = await fetch(
        \`\${process.env.NEXT_ARTICLE_CDN_URL}/project/\${process.env.NEXT_ARTICLE_PROJECT_KEY}/get-content/\${articlePath}\`,
        { next: { revalidate: false }}
    );
    const content = await contentResponse.json() as PostContent;
    return (
        <div>
             <BlogPost articleData={content} />
        </div>
    );
}
`;