export const BLOG_OVERVIEW_PAGE_CODE = `import { BlogOverview } from "nxtblog-ai/dist/components";
import { type ArticlePreviewData } from "nxtblog-ai/dist/types";
import { notFound } from "next/navigation";

export const revalidate = false;


const getArticlePreviews = async () => {
    const url = \`\${process.env.NEXT_ARTICLE_CDN_URL}/project/\${process.env.NEXT_ARTICLE_PROJECT_KEY}/get-previews\`
    return (await fetch(url, {
        cache: 'force-cache'
    }).then((res) =>
        res.json()
    )) as ArticlePreviewData[];
}

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