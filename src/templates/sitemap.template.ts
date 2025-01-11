import type { MetadataRoute } from 'next'
import { getSitemapJson } from "nxtblog-ai/requests";

// revalidate every 12 hours
export const revalidate = 43200;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemapJson = await getSitemapJson()
    return sitemapJson
}