# nxtblog.ai

Create and manage your own SEO optimized content with nxtblog.ai 🚀


## Features
- **Effortless Integration:** Install and configure with your NextJS projects in just a few minutes
- **SSG out of the box:** Full support for static site generation, to ensure your site is fast and SEO-friendly
- **Realtime updates:** See content changes reflected in real-time. No need to rebuild your whole application.
- **AI-Powered:** Create content that is loved by your customers and search engines alike.
- **Image Support:** Serve images seamlessly with our CDN
- **Automatic Sitemap Generation:** Keep search engines in the loop about your content. Without lifting a finger.
- **Intuitive Dashboard:** Edit and manage your content with ease. No more complex CMS's with steep learning curves.
- **Multilanguage Support:** Reach a global audience with our built-in article translation.

## Installation

Install the package using your preferred package manager:

### npm
```bash
npm install nxtblog-ai --save
```

### pnpm
```bash
pnpm install nxtblog-ai
```

### yarn
```bash
yarn add nxtblog-ai
```

## Setup
Initialize nxtblog.ai in your project using the following command.Replace <your-project-key> with your unique project key.This will create the following things in your project:
- 📄 A SSG enabled page showing all published articles
- 📄 A SSG enabled route making each of your blog posts available
- 📄 A secured webhook api endpoint that incrementally rerenders a page when you make changes in the dashboard (ISR)
- 📄 Automatic sitemap generation for all your blog articles
```bash
npx nxtblog-ai init --project-key <your-project-key>
```

### Production
When running in production, make sure to set the following environment variables.
```bash
# .env
# ... your other env variables ...
NXTBLOG_CDN_URL="https://nxtblog.ai/api/cdn/v1"
NXTBLOG_PROJECT_KEY=your-project-key-here
```

That’s it! You’re fully setup to generate SEO-optimized articles for your blog in our dashboard. They will be published in real time to your Next.js application.
[start creating your first content](https://nxtblog.ai/dashboard)

### Specifying a layout for your blog
By default, nxtblog.ai uses the root layout of your project to render the blog to make sure it has the same styles as the rest of your website.
If you do not have a root layout in your project that specifies styles such as font color and page layout, we recommend creating a blog specific layout that specifies these styles. To do this create a new file in your project under /app/\<your-blog-path>/layout.tsx. For example, If your path is /blog, create a file at /app/blog/layout.tsx. This file could look like this:

```tsx 
// Path: /app/blog/layout.tsx
export default function BlogLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <main className="bg-black text-white">
            {children}
        </main>
    )
}
```
