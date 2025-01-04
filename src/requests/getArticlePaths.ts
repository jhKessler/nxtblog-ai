import { z } from "zod";

const articlePreviewsSchema = z.array(z.object({
    path: z.string(),
}));

export default async function getArticlePaths(lang: string) {
    const url = `${process.env.NEXT_ARTICLE_CDN_URL}/project/${process.env.NXTBLOG_PROJECT_KEY}/lang/${lang}/all`
    const response = await fetch(url);
    const articlePreviews = articlePreviewsSchema.parse(await response.json());
    return articlePreviews;
}