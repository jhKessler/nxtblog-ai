import { z } from "zod";

const articlePreviewsSchema = z.array(z.object({
    description: z.string(),
    createdAt: z.string(),
    title: z.string(),
    path: z.string(),
    imageUrl: z.string().optional()
}));

export default async function getArticlePreviews(lang: string) {
    const url = `${process.env.NEXT_ARTICLE_CDN_URL}/project/${process.env.NXTBLOG_PROJECT_KEY}/lang/${lang}/all?preview=true`
    const response = await fetch(url);
    const articlePreviews = articlePreviewsSchema.parse(await response.json());
    return articlePreviews;
}