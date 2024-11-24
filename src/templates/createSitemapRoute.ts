export const CREATE_SITEMAP_ROUTE_CODE = `import type { MetadataRoute } from 'next'
import { getSitemapJson } from "nxtblog-ai/dist/requests";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemapJson = await getSitemapJson()
    return sitemapJson
}` 