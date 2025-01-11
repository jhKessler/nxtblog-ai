import fs from 'fs';


export default function copyFileToProject({
    fileContents,
    targetPath,
    force
}: {
    fileContents: string;
    targetPath: string;
    force: boolean;
}) {
    fileContents = fileContents.replaceAll("// @ts-expect-error", ""); // Remove ts-ignore for dev purposes
    if (fs.existsSync(targetPath)) {
        console.warn(`Warning: File ${targetPath} already exists...`);
        if (!force) {
            console.error("Use --force to overwrite existing files. Stopping initialization...");
            process.exit(1);
        }
    }
    fs.writeFileSync(targetPath, fileContents);
}