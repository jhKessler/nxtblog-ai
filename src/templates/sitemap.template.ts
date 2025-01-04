import type { MetadataRoute } from 'next'
// @ts-expect-error
import { getSitemapJson } from "nxtblog-ai/dist/requests";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemapJson = await getSitemapJson()
    return sitemapJson
}