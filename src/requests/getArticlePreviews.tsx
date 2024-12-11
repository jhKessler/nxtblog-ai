import { ArticlePreviewData } from "../types";

export default async function getArticlePreviews() {
    const url = `${process.env.NEXT_ARTICLE_CDN_URL}/project/${process.env.NEXT_ARTICLE_PROJECT_KEY}/get-previews`
    return (await fetch(url, {
        cache: 'force-cache'
    }).then((res) =>
        res.json()
    )) as ArticlePreviewData[];
}