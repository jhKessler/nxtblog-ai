import Image from "next/image";
import ArticleIntroduction from "./ArticleIntroduction";
import ArticleSection from "./section/ArticleSection";
import ArticleTitle from "./ArticleTitle";
import { PostContent } from "../types";

export default function BlogPost({
    articleData
}: {
    articleData: PostContent
}) {
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem', // equivalent to gap-y-8
            alignItems: 'center' // equivalent to items-center
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem', // equivalent to gap-y-4
                maxWidth: '96rem' // equivalent to max-w-6xl
            }}>
                <ArticleTitle title={articleData.title} />
                {articleData.imageUrl && <Image 
                    src={articleData.imageUrl} 
                    draggable={false} 
                    style={{
                        width: '100%', // equivalent to w-full
                        height: '16rem', // equivalent to h-64
                        objectFit: 'cover', // equivalent to object-cover
                        borderRadius: '0.5rem' // equivalent to rounded-lg
                    }} 
                    alt="image preview" 
                    height={300} 
                    width={300}
                />}
                <ArticleIntroduction text={articleData.description} />
                {articleData.sections.map((section, index) => (
                    <ArticleSection key={index} sectionData={section} />
                ))}
            </div>
        </div>
    );
}
