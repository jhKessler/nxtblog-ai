import { notFound, redirect } from "next/navigation"
// @ts-expect-error
import { getProjectLanguages } from "nxtblog-ai/dist/requests"

export const dynamic = "force-static"
export const revalidate = false

export default async function BlogRedirectPage() {
    const availableLanguages = await getProjectLanguages()
    let defaultLanguage;
    try {
        defaultLanguage = availableLanguages[0].params.lang
    } catch {
        console.warn(`No articles found. Generate some articles on https://nxtblog.ai first`)
        notFound()
    }
    redirect(`__BLOG_PATH__/${defaultLanguage}`)
}
