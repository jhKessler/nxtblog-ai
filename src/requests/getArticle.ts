import { z } from "zod";

const articleSchema = z.object({
    description: z.string(),
    createdAt: z.string(),
    title: z.string(),
    path: z.string(),
    imageUrl: z.string().nullable(),
    markdown: z.string().optional(),
    theme: z.enum(['LIGHT', 'DARK']).optional(),
})

export default async function getArticle({
    lang,
    path,
    withContent
}: {
    lang: string,
    path: string,
    withContent?: boolean
}) {
    const url = `${process.env.NXTBLOG_CDN_URL}/project/${process.env.NXTBLOG_PROJECT_KEY}/lang/${lang}/article/${path}?withContent=${withContent ? 'true' : 'false'}`;
    const response = await fetch(url);
    const article = articleSchema.parse(await response.json());
    return article;
}