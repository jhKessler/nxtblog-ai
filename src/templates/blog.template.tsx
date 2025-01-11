// @ts-expect-error
import { BlogOverview } from "nxtblog-ai/dist/components";
import { notFound } from "next/navigation";
// @ts-expect-error
import { getArticlePreviews, getProjectLanguages } from "nxtblog-ai/dist/requests";

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
    try {
        const articlePreviews = await getArticlePreviews(lang);
        return (
            <BlogOverview previews={articlePreviews.previews} theme={articlePreviews.theme}/>
        )
    } catch (e) {
        console.error(e);
        notFound();
    }
    
}