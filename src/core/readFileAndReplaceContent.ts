import fs from 'fs';

export default function readFileAndReplaceContent({
    filepath,
    replace,
    replaceWith
}: {
    filepath: string;
    replace?: string;
    replaceWith?: string;
}) {
    const fileContents = fs.readFileSync(filepath, "utf8");
    const newFileContents = (replace && replaceWith) ? fileContents.replaceAll(replace, replaceWith) : fileContents;
    return newFileContents;
}