import fs from 'fs';


export default function createOrUpdateEnvFile({
    projectKey,
    cdnUrl
}: {
    projectKey: string;
    cdnUrl: string;
}) {
    // first check if the file already exisyts and has the correct values
    if (fs.existsSync('.env')) {
        const envFile = fs.readFileSync('.env', 'utf-8');
        const cdnUrlMatch = envFile.match(/NXTBLOG_CDN_URL="(.*)"/);
        const projectKeyMatch = envFile.match(/NXTBLOG_PROJECT_KEY="(.*)"/);
        if (cdnUrlMatch && projectKeyMatch) {
            if (cdnUrlMatch[1] === cdnUrl && projectKeyMatch[1] === projectKey) {
                console.log("Environment file already exists and is up to date.");
                return;
            } else {
                console.warn("Environment file already exists but has different values. Please check the file and update it manually.");
                process.exit(1);
            }

        }
    }
    const writeLine = `\n# nxtblog.ai credentials \nNXTBLOG_CDN_URL="${cdnUrl}"\nNXTBLOG_PROJECT_KEY="${projectKey}"\n`;
    fs.appendFileSync('.env', writeLine);
}