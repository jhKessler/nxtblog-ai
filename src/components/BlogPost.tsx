import ReactMarkdown from "react-markdown";


export default function BlogPost({
    markdown,
    theme
}: {
    markdown: string;
    theme: "LIGHT" | "DARK";
}) {
    return <article className="bg-black text-white">
        <ReactMarkdown className={
           theme === "DARK" ? "markdown-body-dark" : "markdown-body-light"
        }>
            {markdown}
        </ReactMarkdown>
    </article>
}