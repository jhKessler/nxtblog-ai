import fs from 'fs';


export default function createOrUpdateRobotsTxt({
    domain,
    blogPath
}: {
    domain: string;
    blogPath: string;
}) {
    const writeLine = `\nSitemap: ${domain}${blogPath}/sitemap.xml\n`;

    if (!fs.existsSync('public')) {
        console.warn('No public directory found, creating one...');
        fs.mkdirSync('public');
    }
    
    fs.appendFileSync('public/robots.txt', writeLine);
}