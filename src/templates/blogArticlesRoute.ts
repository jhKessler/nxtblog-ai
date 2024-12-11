

export const BLOG_ARTICLES_ROUTE_CODE = `import { BlogPost } from "nxtblog-ai/dist/components";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleContent, getArticleMetadata, getArticlePaths } from "nxtblog-ai/dist/requests";

export const revalidate = false;
export const dynamicParams = true;

export async function generateStaticParams() {
    return await getArticlePaths();
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ articlePath: string; }>;
}): Promise<Metadata> {
    const { articlePath } = await params;
    return await getArticleMetadata(articlePath);
}

export default async function Page({
    params,
}: {
    params: Promise<{ articlePath: string; }>;
}) {
    const { articlePath } = await params;
    let content;
    try {
        content = await getArticleContent(articlePath);
    }
    catch {
        notFound();
    }
    if (!content) {
        notFound();
    }
    return (
        <BlogPost articleData={content} />
    );
}
`;