export const BLOG_OVERVIEW_PAGE_CODE = `import { BlogOverview } from "nxtblog-ai/dist/components";
import { type ArticlePreviewData } from "nxtblog-ai/dist/types";
import { notFound } from "next/navigation";
import { getArticlePreviews } from "nxtblog-ai/dist/requests";

export const revalidate = false;

export default async function BlogOverviewPage() {
    let previews;
    try {
         previews = await getArticlePreviews();
    } catch {
        return notFound();
    }

    return (
        <BlogOverview previews={previews} />
    )
}
`