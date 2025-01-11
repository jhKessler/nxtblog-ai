import { z } from "zod";

export const sitemapJsonSchema = z.array(
  z.object({
    url: z.string().url(),
    lastModified: z.coerce.date(), // Coerces strings or numbers to a Date
    alternates: z.object({
      languages: z.record(z.string().url()),
    }),
  })
);

export default async function getSitemapJson() {
    if (
        !process.env.NXTBLOG_PROJECT_KEY ||
        !process.env.NXTBLOG_CDN_URL
      ) {
        throw new Error(
          "NXTBLOG_PROJECT_KEY and NXTBLOG_CDN_URL must be set in your environment variables."
        );
      }
      const response = await fetch(
        `${process.env.NXTBLOG_CDN_URL}/project/${process.env.NXTBLOG_PROJECT_KEY}/sitemap`
      );
      const sitemap = sitemapJsonSchema.parse(await response.json());
      return sitemap;
}
