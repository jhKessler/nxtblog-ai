

export default function ArticleIntroduction({
    text
}: {
    text: string
}) {
    return (
        <p style={{
            fontSize: "1.125rem",
            lineHeight: "1.75rem"
        }}>{text}</p>
    )
}