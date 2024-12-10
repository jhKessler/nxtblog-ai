export const BLOG_OVERVIEW_PAGE_CODE = `import { ArticlePreview } from "nxtblog-ai/dist/components";
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

export default async function BlogOverview() {
    let previews;
    try {
         previews = await getArticlePreviews();
    } catch {
        return notFound();
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>Blog</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {previews.map((article, index) => (
                    <ArticlePreview
                        key={index}
                        title={article.title}
                        description={article.description}
                        createdAt={new Date(article.createdAt)}
                        articlePath={article.articlePath}
                        imageUrl={article.imageUrl}
                    />
                ))}
            </div>
        </div>
    )
}
`