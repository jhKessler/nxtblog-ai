import React from "react";
import { BlogOverview } from "nxtblog-ai/components";
import { notFound } from "next/navigation";
import { getArticlePreviews, getProjectLanguages } from "nxtblog-ai/requests";

export const dynamicParams = true;
export const revalidate = false;

export async function generateStaticParams() {
    return await getProjectLanguages();
}

export default async function BlogOverviewPage({
    params,
}: {
    params: Promise<{ lang: string; }>;
}) {
    const { lang } = await params;
    const availableLanguages = await getProjectLanguages();
    try {
        const articlePreviews = await getArticlePreviews(lang);
        return (
            <BlogOverview 
                previews={articlePreviews.previews}
                theme={articlePreviews.theme}
                lang={lang}
                availableLanugages={availableLanguages}
                blogPath="__BLOG_PATH__"
             />
        )
    } catch (e) {
        console.error(e);
        notFound();
    }

}