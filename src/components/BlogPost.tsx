import ReactMarkdown from "react-markdown";


export default function BlogPost({
    markdown,
    theme
}: {
    markdown: string;
    theme: "LIGHT" | "DARK";
}) {
    return <article style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <div style={{
            width: "100%",
            maxWidth: "1100px"
        }}>

        <ReactMarkdown className={
           theme === "DARK" ? "markdown-body-dark" : "markdown-body-light"
        }>
            {markdown}
        </ReactMarkdown>
        </div>
    </article>
}