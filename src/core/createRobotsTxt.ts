import fs from 'fs';


export default function createOrUpdateRobotsTxt({
    domain,
    blogPath
}: {
    domain: string;
    blogPath: string;
}) {
    const writeLine = `Sitemap: ${domain}${blogPath}/sitemap.xml\n`;

    if (!fs.existsSync('public')) {
        console.warn('No public directory found, creating one...');
        fs.mkdirSync('public');
    }

    if (fs.existsSync('public/robots.txt')) {
        console.warn('robots.txt already exists, appending...');
        fs.appendFileSync('public/robots.txt', writeLine);
    }
    else {
        console.log('Creating robots.txt...');
        fs.writeFileSync('public/robots.txt', writeLine);
    }
}