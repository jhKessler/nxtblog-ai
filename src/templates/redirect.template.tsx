import { redirect } from "next/navigation"
// @ts-expect-error
import { getProjectLanguages } from "nxtblog-ai/dist/requests"

export const dynamic = "force-static"
export const revalidate = false

export default async function BlogRedirectPage() {
    const availableLanguages = await getProjectLanguages()
    const defaultLanguage = availableLanguages[0].params.lang
    redirect(`/__BLOG_PATH__/${defaultLanguage}`)
    return null
}
