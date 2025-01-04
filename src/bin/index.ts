#!/usr/bin/env node

import { Command } from 'commander';
import * as path from 'path';
import getProjectInfo from '../requests/getProjectInfo';
import createOrUpdateRobotsTxt from '../core/createRobotsTxt';
import checkProjectStructure from '../core/checkProjectStructure';
import { CDN_URL } from '../config';
import createOrUpdateEnvFile from '../core/createEnvFile';
import createBlogDir from '../core/createBlogDir';
import readFileAndReplaceContent from '../core/readFileAndReplaceContent';
import copyFileToProject from '../core/copyFileToProject';
import fs from "fs";

const program = new Command();
const TEMPLATES_DIR = path.join(__dirname, '..', "..", "src", 'templates');


program
    .command("init")
    .requiredOption("--project-key <key>", "key is required")
    .option("--force", "force initialization", false)
    .option("--cdn <cdn>", "use a custom CDN URL", CDN_URL)
    .description("Initialize a new Next.js project")
    .action(async (options) => {
        console.log(`Initializing nxtblog.ai in your project...`);
        const appFolderPath = checkProjectStructure();

        const projectInfo = await getProjectInfo(options.projectKey, options.cdn);

        // create blog dirs
        const blogRouteFolder = path.join(appFolderPath, projectInfo.blogPath);
        const blogRouteFolderWithLang = path.join(blogRouteFolder, "[lang]", "[path]");
        createBlogDir({
            blogRouteFolder: blogRouteFolderWithLang,
            force: options.force
        })
        // create sitemap file
        const generateSitemapFilePath = path.join(appFolderPath, projectInfo.blogPath, 'sitemap.ts');
        const sitemapCode = readFileAndReplaceContent({
            filepath: path.join(TEMPLATES_DIR, "/sitemap.template.ts"),
        })
        copyFileToProject({
            fileContents: sitemapCode,
            targetPath: generateSitemapFilePath,
            force: options.force
        })
        // create blog overview
        const blogOverviewPath = path.join(blogRouteFolder, "[lang]", "page.tsx");
        const blogOverviewCode = readFileAndReplaceContent({
            filepath: path.join(TEMPLATES_DIR, "/blog.template.tsx"),
        })
        copyFileToProject({
            fileContents: blogOverviewCode,
            targetPath: blogOverviewPath,
            force: options.force
        })
        // create blog article
        const blogArticlePath = path.join(blogRouteFolderWithLang, "page.tsx");
        const blogArticleCode = readFileAndReplaceContent({
            filepath: path.join(TEMPLATES_DIR, "/article.template.tsx"),
        })
        copyFileToProject({
            fileContents: blogArticleCode,
            targetPath: blogArticlePath,
            force: options.force
        })

        // Create the revalidate route
        const revalidateRouteFolder = path.join(appFolderPath, 'api', 'webhooks', "nxtblog");
        const revalidateRouteFilePath = path.join(revalidateRouteFolder, 'route.ts');
        fs.mkdirSync(revalidateRouteFolder, { recursive: true });
        const revalidateCode = readFileAndReplaceContent({
            filepath: path.join(TEMPLATES_DIR, "/revalidate.template.ts"),
            replace: "__BLOG_PATH__",
            replaceWith: projectInfo.blogPath
        })
        console.log(`Creating file ${revalidateRouteFilePath}`);
        copyFileToProject({
            fileContents: revalidateCode,
            targetPath: revalidateRouteFilePath,
            force: options.force
        })

        createOrUpdateRobotsTxt({
            domain: projectInfo.domain,
            blogPath: projectInfo.blogPath
        });

        createOrUpdateEnvFile({
            cdnUrl: options.cdn,
            projectKey: options.projectKey
        });

        console.log(`Initialization complete. Go to https://nxtblog.ai/dashboard/project/${projectInfo.urlId} to start generating articles.`);
    });

program.parse(process.argv);
