import { CDN_URL } from "../config";
import { ProjectInfoResponse } from "../types/ProjectInfoReponse";

export default async function getProjectInfo(projectKey: string) {
  return (await fetch(`${CDN_URL}/project/${projectKey}/get-info`).then((res) =>
    res.json()
  )) as ProjectInfoResponse;
}
