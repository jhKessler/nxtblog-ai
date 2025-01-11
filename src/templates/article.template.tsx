
import { notFound } from "next/navigation";
// @ts-expect-error
import { getArticle, getProjectLanguages } from "nxtblog-ai/dist/requests";
import { Metadata } from "next";
// @ts-expect-error
import { BlogPost } from "nxtblog-ai/dist/components";

export const revalidate = false;

export async function generateStaticParams() {
    return await getProjectLanguages();
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; path: string; }>;
}): Promise<Metadata> {
    try {
        const { lang, path } = await params;
        const metadata = await getArticle({
            lang,
            path,
        })
        return {
            title: metadata.title,
            description: metadata.description,
        }
    } catch (e) {
        console.error(e);
        notFound();
    }
}

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ lang: string; path: string; }>;
}) {
    const { lang, path } = await params;
    try {
        const content = await getArticle({
            lang,
            path,
            withContent: true,
        });
        return (
            <BlogPost markdown={content.markdown!} theme={content.theme!} />
        )
    } catch (e) {
        console.error(e);
        notFound();
    }
}