import { notFound, redirect } from "next/navigation"
// @ts-expect-error
import { getProjectLanguages } from "nxtblog-ai/dist/requests"

export const dynamic = "force-static"
export const revalidate = false

export default async function BlogRedirectPage() {
    const availableLanguages = await getProjectLanguages()
    try {
        // Redirect to the first available language
        const defaultLanguage = availableLanguages[0].params.lang
        redirect(`__BLOG_PATH__/${defaultLanguage}`)
    } catch {
        console.error(`No articles found. Generate some articles on https://nxtblog.ai first`)
        notFound()
    }
    return null
}
