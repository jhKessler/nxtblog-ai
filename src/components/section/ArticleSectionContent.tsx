export default function ArticleSectionContent({
    content
}: {
    content: string;
}) {
    return (
        <p style={{
            fontSize: "1.125rem",
            lineHeight: "1.75rem"
        }}>
            {content}
        </p>
    );
}
