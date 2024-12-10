import { ArticlePreviewData } from "../types";
import ArticlePreview from "./ArticlePreview";


export default function BlogOverview({
    previews,
    mode = 'light'
}: {
    previews: ArticlePreviewData[]
    mode?: 'light' | 'dark'
}) {
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
                        mode={mode}
                    />
                ))}
            </div>
        </div>
    )
}