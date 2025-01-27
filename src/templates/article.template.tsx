import React from "react";
import { notFound } from "next/navigation";
import { getArticle, getArticlePaths, getProjectLanguages } from "nxtblog-ai/requests";
import { type Metadata } from "next";
import { BlogPost } from "nxtblog-ai/components";
import "nxtblog-ai/components/index.css"

export const dynamicParams = true;
export const revalidate = false;


export async function generateStaticParams() {
    const languages = await getProjectLanguages();
    const allPaths: { lang: string; path: string }[] = [];

    for (const lang of languages) {
        const paths = await getArticlePaths(lang.lang);
        paths.forEach((p) => {
            allPaths.push({ lang: lang.lang, path: p.path });
        });
    }

    return allPaths;
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