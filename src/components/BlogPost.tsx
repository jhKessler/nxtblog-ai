import ReactMarkdown from "react-markdown";
import "./../styles/markdown_styles_dark.css";
import "./../styles/markdown_styles_light.css";

export default function BlogPost({
    markdown
}: {
    markdown: string
}) {
    return <article className="bg-black text-white">
        <ReactMarkdown className={
            process.env.NXTBLOG_THEME === "dark" ? "markdown-body-dark" : "markdown-body-light"
        }>
            {markdown}
        </ReactMarkdown>
    </article>
}