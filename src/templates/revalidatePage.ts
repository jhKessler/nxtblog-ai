export const getRevalidatePageEndpointCode = (blogPath: string) => {
  return `import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';

export async function POST(request: Request, { params }: { params: Promise<{ articlePath: string }> }) {
    const { articlePath } = await params;
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
            { message: 'Authorization header missing or invalid' },
            { status: 403 },
        );
    }
    const token = authHeader.substring('Bearer '.length);
    if (token !== process.env.NEXT_ARTICLE_PROJECT_KEY) {
        return NextResponse.json(
            { message: 'Invalid token' },
            { status: 403 },
        );
    }
    if (!articlePath) {
        return NextResponse.json(
            { message: \`Article path not provided\` },
            { status: 400 },
        );
    }

    revalidatePath(\`${blogPath}/\${articlePath}\`);
    revalidatePath(\`${blogPath}\`);

    return NextResponse.json(
        { message: \`Rebuild static site \${articlePath}\` },
        { status: 200 },
    );
}
`;
};
