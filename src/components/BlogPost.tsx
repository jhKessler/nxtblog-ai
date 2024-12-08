import Image from "next/image";
import ArticleIntroduction from "./ArticleIntroduction";
import ArticleSection from "./section/ArticleSection";
import ArticleTitle from "./ArticleTitle";
import { PostContent } from "../types";

export default function BlogPost({
    articleData,
    callToAction
}: {
    articleData: PostContent;
    callToAction: React.ReactNode;
}) {
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'center'
        }}>
            <article style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: '96rem'
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
                        priority={true}
                    />
                )}
                <ArticleIntroduction text={articleData.description} />
                {articleData.sections.map((section, index) => (
                    <ArticleSection key={index} sectionData={section} />
                ))}
                {callToAction && callToAction}
            </article>
        </div>
    );
}
