import fs from "fs";

export default function createBlogDir({
  blogRouteFolder,
  force,
}: {
  blogRouteFolder: string;
  force: boolean;
}) {
  if (fs.existsSync(blogRouteFolder)) {
    console.warn(
      `Warning: Folder ${blogRouteFolder} already exists. Have you already initialized nxtblog.ai?`
    );
    if (!force) {
      console.error(
        "Use --force to overwrite existing files. Stopping initialization..."
      );
      process.exit(1);
    }
  } else {
    console.log(`Creating folder ${blogRouteFolder}`);
    fs.mkdirSync(blogRouteFolder, { recursive: true });
  }
}
