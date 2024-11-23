import ArticleSectionHeadline from "./ArticleSectionHeadline";
import ArticleSectionContent from "./ArticleSectionContent";
import ArticleSectionList from "./ArticleSectionList";
import { PostSectionData } from "../../types";

export default function ArticleSection({
    sectionData
}: {
    sectionData: PostSectionData;
}) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem' // equivalent to gap-y-4
        }}>
            <ArticleSectionHeadline headline={sectionData.section_headline} />
            <ArticleSectionContent content={sectionData.content} />
            {sectionData.list && (
                <ArticleSectionList items={sectionData.list} />
            )}
        </div>
    );
}
