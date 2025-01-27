import { z } from "zod";

const articlePathsSchema = z.object({
    theme: z.enum(['LIGHT', 'DARK']).optional(),
    previews: z.array(z.object({
        path: z.string(),
    }))
})

export default async function getArticlePaths(lang: string) {
    const url = `${process.env.NXTBLOG_CDN_URL}/project/${process.env.NXTBLOG_PROJECT_KEY}/lang/${lang}/all`
    const response = await fetch(url);
    const articlePreviews = articlePathsSchema.parse(await response.json());
    return articlePreviews.previews;
}