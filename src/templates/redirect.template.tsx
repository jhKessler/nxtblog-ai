import { notFound, redirect } from "next/navigation"
import { getProjectLanguages } from "nxtblog-ai/requests"

export const dynamic = "force-static"
export const revalidate = false

export default async function BlogRedirectPage() {
    const availableLanguages = await getProjectLanguages()
    let defaultLanguage = "en";
    if (availableLanguages[0]?.params.lang) {
        defaultLanguage = availableLanguages[0].params.lang
    }
    redirect(`__BLOG_PATH__/${defaultLanguage}`)
}
