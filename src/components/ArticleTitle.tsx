

export default function ArticleTitle({
    title
}: {
    title: string
}) {
    return (
        <h1 style={{
            fontSize: "2.25rem",
            lineHeight: "2.75rem",
            fontWeight: "bold"
        }}>
            {title}
        </h1>
    )
}