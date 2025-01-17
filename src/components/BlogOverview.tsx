import React from 'react';
import { ArticlePreviewData } from "../types";
import ArticlePreview from "./ArticlePreview";
import LanguageSelector from './LanguageSelector';

export default function BlogOverview({
    previews,
    lang,
    availableLanugages,
    theme = 'LIGHT',
    blogPath
}: {
    previews: ArticlePreviewData[]
    theme?: 'LIGHT' | 'DARK'
    lang: string
    availableLanugages: { lang: string }[];
    blogPath: string;
}) {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
                gap: '2rem'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                }}>
                    <h1 style={{
                        fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem', maxWidth: '600px',
                        width: '100%',
                    }}>Blog</h1>
                    <LanguageSelector
                        currentLanguage={lang}
                        languages={availableLanugages}
                        theme={theme}
                        blogPath={blogPath}
                    />
                </div>
                {previews.map((article, index) => (
                    <ArticlePreview
                        key={index}
                        title={article.title}
                        description={article.description}
                        createdAt={new Date(article.createdAt)}
                        path={article.path}
                        imageUrl={article.imageUrl}
                        theme={theme}
                    />
                ))}
            </div>
        </div>
    )
}