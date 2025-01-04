import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';
import z from 'zod';

const revalidateRequestSchema = z.object({
    language: z.string(),
    articlePath: z.string(),
});

export async function POST(request: Request) {
    const { language, articlePath } = revalidateRequestSchema.parse(await request.json());


    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json(
            { message: 'Authorization header missing or invalid' },
            { status: 403 },
        );
    }
    const token = authHeader.substring('Bearer '.length);
    if (token !== process.env.NXTBLOG_PROJECT_KEY) {
        return NextResponse.json(
            { message: 'Invalid token' },
            { status: 403 },
        );
    }
    if (!articlePath || !language) {
        return NextResponse.json(
            { message: `Invalid request` },
            { status: 400 },
        );
    }

    // Revalidate the article path and the blog overview page
    revalidatePath(`__BLOG_PATH__/${language}/${articlePath}`);
    revalidatePath(`__BLOG_PATH__/${language}`);

    return NextResponse.json(
        { message: `Rebuilt static site ${articlePath} and language ${language}` },
        { status: 200 },
    );
}
