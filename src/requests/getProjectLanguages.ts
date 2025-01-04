import { z } from "zod";

const projectLanguagesSchema = z.object({
  languages: z.array(z.object({
    params: z.object({
        lang: z.string()
    })
  })),
});

export default async function getProjectLanguages() {
  if (
    !process.env.NXTBLOG_PROJECT_KEY ||
    !process.env.NXTBLOG_CDN_URL
  ) {
    throw new Error(
      "NXTBLOG_PROJECT_KEY and NXTBLOG_CDN_URL must be set in your environment variables."
    );
  }
  const response = await fetch(
    `${process.env.NXTBLOG_CDN_URL}/project/${process.env.NXTBLOG_PROJECT_KEY}/languages`
  );
  const projectLanguages = projectLanguagesSchema.parse(await response.json());
  return projectLanguages.languages;
}
