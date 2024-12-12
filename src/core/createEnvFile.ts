import fs from 'fs';


export default function createOrUpdateEnvFile({
    projectKey,
    cdnUrl
}: {
    projectKey: string;
    cdnUrl: string
}) {
    const writeLine = `\n# nxtblog.ai credentials \nNEXT_ARTICLE_CDN_URL="${cdnUrl}"\nNEXT_ARTICLE_PROJECT_KEY="${projectKey}"\n`;
    fs.appendFileSync('.env', writeLine);
}