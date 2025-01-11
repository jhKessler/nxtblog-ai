import React from "react";
import ReactMarkdown from "react-markdown";
import "./styles/markdown_styles_dark.css";
import "./styles/markdown_styles_light.css";


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