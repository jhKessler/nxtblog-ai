export const getRevalidatePageEndpointCode = (blogPath: string) => {
  return `import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';

export async function POST(request: Request, { params }: { params: Promise<{ articlePath: string }> }) {
    const { articlePath } = await params;

    if (!articlePath) {
        return NextResponse.json(
            { message: \`Article path not provided\` },
            { status: 400 },
        );
    }

    revalidatePath(\`/${blogPath}/\${articlePath}\`);

    return NextResponse.json(
        { message: \`Rebuild static site \${articlePath}\` },
        { status: 200 },
    );
}
`;
};
