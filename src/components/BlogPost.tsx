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
                {articleData.imageUrl && (
                    <Image
                        src={articleData.imageUrl}
                        draggable={false}
                        className="w-full object-contain rounded-lg"
                        alt="image preview"
                        width={600}
                        height={600}
                    />
                )}
                <ArticleIntroduction text={articleData.description} />
                {articleData.sections.map((section, index) => (
                    <ArticleSection key={index} sectionData={section} />
                ))}
            </div>
        </div>
    );
}
