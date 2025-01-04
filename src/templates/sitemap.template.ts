import type { MetadataRoute } from 'next'
// @ts-expect-error
import { getSitemapJson } from "nxtblog-ai/dist/requests";

// revalidate every day
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemapJson = await getSitemapJson()
    return sitemapJson
}