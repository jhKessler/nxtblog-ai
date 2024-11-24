

export const BLOG_ARTICLES_ROUTE_CODE = `import { BlogPost } from "nxtblog-ai/dist/components";
import { type PostContent } from "nxtblog-ai/dist/types";
import { type Metadata } from "next";

export const revalidate = false;
export const dynamicParams = true;

export async function generateStaticParams() {
    const articlePaths = await fetch(
        \`\${process.env.NEXT_ARTICLE_CDN_URL}/project/\${process.env.NEXT_ARTICLE_PROJECT_KEY}/get-articles\`
    ).then((res) =>
        res.json()
    ) as string[];
    if (!articlePaths) {
        console.error("No articles found, check if you set NEXT_ARTICLE_PROJECT_KEY and NEXT_ARTICLE_CDN_URL correctly in your environment variables.");
        return [];
    }
    return articlePaths.map((articlePath) => ({
        articlePath
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ articlePath: string; }>;
}): Promise<Metadata> {
    const { articlePath } = await params;

    const metadata = await fetch(
       \`\${process.env.NEXT_ARTICLE_CDN_URL}/project/\${process.env.NEXT_ARTICLE_PROJECT_KEY}/get-metadata/\${articlePath}\`
    ).then((res) => res.json()) as {
        title: string;
        description: string;
    };
    return {
        title: metadata.title,
        description: metadata.description,
    };
}

async function getPostContent(articlePath: string) {
    const contentResponse = await fetch(
        \`\${process.env.NEXT_ARTICLE_CDN_URL}/project/\${process.env.NEXT_ARTICLE_PROJECT_KEY}/get-content/\${articlePath}\`,
    );
    const content = await contentResponse.json() as PostContent;
    return content;
}

export default async function Page({
    params,
}: {
    params: Promise<{ articlePath: string; }>;
}) {
    const { articlePath } = await params;
    const content = await getPostContent(articlePath);
    return (
        <div>
             <BlogPost articleData={content} />
        </div>
    );
}
`;