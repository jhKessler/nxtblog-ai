import React from "react";
import { notFound } from "next/navigation";
import { getArticle, getProjectLanguages } from "nxtblog-ai/requests";
import { Metadata } from "next";
import { BlogPost } from "nxtblog-ai/components";

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