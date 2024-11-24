import fs from 'fs';


export default function checkProjectStructure() {
    const hasSrcFolder = fs.existsSync("src");
        const hasPagesFolder = fs.existsSync(hasSrcFolder ? "src/pages" : "pages");
        const hasAppFolder = fs.existsSync(hasSrcFolder ? "src/app" : "app");

        if (hasPagesFolder) {
            console.error("NextJS pages router is currently not supported. ");
            process.exit(1);
        }

        if (!hasAppFolder) {
            console.error("Error: Invalid NextJS project structure. No /app or /src/app folder found.");
            process.exit(1);
        }
        
        return hasSrcFolder ? "src/app" : "app";
}