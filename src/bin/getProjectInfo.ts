import { z } from "zod";

const projectInfoSchema = z.object({
  domain: z.string(),
  blogPath: z.string(),
  urlId: z.string(),
}); 

export default async function getProjectInfo(projectKey: string, cdn_url: string) {
  const response = await fetch(`${cdn_url}/project/${projectKey}/info`);
  if (response.status === 404) {
    console.error("Project not found. The project key may be incorrect.");
    process.exit(1);
  }
  const projectInfo = projectInfoSchema.parse(await response.json());
  return projectInfo;
}
