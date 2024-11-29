#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import * as path from 'path';
import { getRevalidatePageEndpointCode } from '../templates/revalidatePage';
import { BLOG_ARTICLES_ROUTE_CODE } from '../templates/blogArticlesRoute';
import getProjectInfo from '../requests/getProjectInfo';
import createOrUpdateRobotsTxt from '../core/createRobotsTxt';
import checkProjectStructure from '../core/checkProjectStructure';
import { CREATE_SITEMAP_ROUTE_CODE } from '../templates/createSitemapRoute';
import { CDN_URL } from '../config';

const program = new Command();

program
    .command("init")
    .requiredOption("--project-key <key>", "key is required")
    .option("--force", "force initialization", false)
    .option("--cdn <cdn>", "use a custom CDN URL", CDN_URL)
    .description("Initialize a new Next.js project")
    .action(async (options) => {
        console.log(`Initializing nxtblog.ai in your project...`);
        const appFolderPath = checkProjectStructure();

        let projectInfo
        try {
           projectInfo = await getProjectInfo(options.projectKey, options.cdn);
        } catch (e) {
            console.error("Error: Invalid project key.");
            process.exit(1);
        }
        const blogRouteFolder = path.join(appFolderPath, projectInfo.blogPath, "[articlePath]");
        
        if (fs.existsSync(blogRouteFolder)) {
            console.warn(
                `Warning: Folder ${blogRouteFolder} already exists. Have you already initialized nxtblog.ai?`
            );
            if (!options.force) {
                console.error("Use --force to overwrite existing files. Stopping initialization...");
                process.exit(1);
            }
        } else {
            console.log(`Creating folder ${blogRouteFolder}`);
            fs.mkdirSync(blogRouteFolder, { recursive: true });
        }

        // Create the revalidate route
        const revalidateRouteFolder = path.join(appFolderPath, 'api', 'revalidate', '[articlePath]');

        if (fs.existsSync(revalidateRouteFolder)) {
            console.warn(
                `Warning: Folder ${revalidateRouteFolder} already exists. Have you already initialized nxtblog.ai?`
            );
            if (!options.force) {
                console.error("Use --force to overwrite existing files. Stopping initialization...");
                process.exit(1);
            }
        } else {
            console.log(`Creating folder ${revalidateRouteFolder}`);
            fs.mkdirSync(revalidateRouteFolder, { recursive: true });
        }

        const revalidateRouteFilePath = path.join(revalidateRouteFolder, 'route.ts');
        const revalidateRouteCode = getRevalidatePageEndpointCode(projectInfo.blogPath);
        const generateSitemapFilePath = path.join(appFolderPath, projectInfo.blogPath, 'sitemap.ts');

        const blogPageFilePath = path.join(blogRouteFolder, 'page.tsx');

        console.log(`Creating file ${revalidateRouteFilePath}`);
        fs.writeFileSync(revalidateRouteFilePath, revalidateRouteCode);
        console.log(`Creating file ${blogPageFilePath}`);
        fs.writeFileSync(blogPageFilePath, BLOG_ARTICLES_ROUTE_CODE);
        console.log(`Creating file ${generateSitemapFilePath}`);
        fs.writeFileSync(generateSitemapFilePath, CREATE_SITEMAP_ROUTE_CODE)

        createOrUpdateRobotsTxt({
            domain: projectInfo.domain,
            blogPath: projectInfo.blogPath
        });
        console.log(`Initialization complete. Go to https://nxtblog.ai/dashboard/project/${projectInfo.urlId} to start generating articles.`);
    });

program.parse(process.argv);
