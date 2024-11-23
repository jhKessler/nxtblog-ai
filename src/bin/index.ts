#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import * as path from 'path';
import { getRevalidatePageEndpointCode } from '../templates/revalidatePage';
import { BLOG_ARTICLES_ROUTE_CODE } from '../templates/blogArticlesRoute';

const program = new Command();

program
    .command("init")
    .requiredOption("--path <path>", "path is required")
    .description("Initialize a new Next.js project")
    .action((options) => {
        const pathRegex = /^[a-zA-Z0-9_\/-]+$/; // Allow letters, numbers, _, -, and /

        if (!pathRegex.test(options.path)) {
            console.error(
                "Error: Path should only contain letters, numbers, underscores (_), dashes (-), and slashes (/)."
            );
            process.exit(1); // Exit the process with a failure code
        }

        console.log(`Initializing nxtblog.ai in your project under path "${options.path}"...`);

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

        const blogRouteFolder = hasSrcFolder
            ? `src/app/${options.path}/[articlePath]`
            : `app/${options.path}/[articlePath]`;
        if (fs.existsSync(blogRouteFolder)) {
            console.warn(
                `Warning: Folder ${blogRouteFolder} already exists. Have you already initialized nxtblog.ai?`
            );
        } else {
            console.log(`Creating folder ${blogRouteFolder}`);
            fs.mkdirSync(blogRouteFolder, { recursive: true });
        }

        const templateDir = path.join(__dirname, '../../templates');
        console.log(`Copying templates from ${templateDir} to ${blogRouteFolder}`);

        // Create the revalidate route
        const revalidateRouteFolder = hasSrcFolder
            ? `src/app/api/revalidate/[articlePath]`
            : `app/api/revalidate/[articlePath]`;

        if (!fs.existsSync(revalidateRouteFolder)) {
            console.log(`Creating folder ${revalidateRouteFolder}`);
            fs.mkdirSync(revalidateRouteFolder, { recursive: true });
        }

        const revalidateRouteFilePath = path.join(revalidateRouteFolder, 'route.ts');

        if (!fs.existsSync(revalidateRouteFilePath)) {
            fs.writeFileSync(revalidateRouteFilePath, getRevalidatePageEndpointCode(options.path));
            console.log(`Created file ${revalidateRouteFilePath}`);
        } else {
            console.warn(`File ${revalidateRouteFilePath} already exists.`);
        }

        // Create the blog page route
        const blogPageFolder = hasSrcFolder
            ? `src/app/blog/[articlePath]`
            : `app/blog/[articlePath]`;

        if (!fs.existsSync(blogPageFolder)) {
            console.log(`Creating folder ${blogPageFolder}`);
            fs.mkdirSync(blogPageFolder, { recursive: true });
        }

        const blogPageFilePath = path.join(blogPageFolder, 'page.tsx');

        if (!fs.existsSync(blogPageFilePath)) {
            fs.writeFileSync(blogPageFilePath, BLOG_ARTICLES_ROUTE_CODE);
            console.log(`Created file ${blogPageFilePath}`);
        } else {
            console.warn(`File ${blogPageFilePath} already exists.`);
        }
    });

program.parse(process.argv);
