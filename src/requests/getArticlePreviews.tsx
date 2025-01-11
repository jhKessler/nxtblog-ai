import { z } from "zod";

const articlePreviewsSchema = z.object({
    theme: z.enum(['LIGHT', 'DARK']).optional(),
    previews: z.array(z.object({
        path: z.string(),
        title: z.string(),
        description: z.string(),
        imageUrl: z.string().nullable(),
        createdAt: z.string(),
    }))
})


export default async function getArticlePreviews(lang: string) {
    const url = `${process.env.NXTBLOG_CDN_URL}/project/${process.env.NXTBLOG_PROJECT_KEY}/lang/${lang}/all?preview=true`
    const response = await fetch(url);
    const articlePreviews = articlePreviewsSchema.parse(await response.json());
    return articlePreviews;
}