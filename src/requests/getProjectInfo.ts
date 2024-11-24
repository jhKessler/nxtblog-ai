import { CDN_URL } from "../config";
import { ProjectInfoResponse } from "../types/ProjectInfoReponse";

export default async function getProjectInfo(projectKey: string, cdn_url: string) {
  return (await fetch(`${cdn_url}/project/${projectKey}/get-info`).then((res) =>
    res.json()
  )) as ProjectInfoResponse;
}
