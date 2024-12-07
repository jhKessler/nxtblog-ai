# nxtblog.ai

Generate and publish SEO-optimized articles to your Next.js application within minutes 🚀


## Features
- **Effortless Integration:** Install and configure with your NextJS projects in just a few minutes
- **SSG out of the box:** Full support for static site generation, to ensure your site is fast and SEO-friendly
- **Realtime updates:** Make changes to your content and see them reflected in your app in real-time
- **SEO Optimization:** Generate articles that are optimized for search engines using LLM's
- **Image Support:** Serve images seamlessly with our CDN
- **Automatic Sitemap Generation:** Let Google now about your new articles without lifting a finger


## Disclaimer
This package is still untested with older NextJS versions than 15, if you run into any issues while setting up, please open an issue and we will look into it ASAP!


## Coming Soon:
- [ ] Pages router support
- [ ] Automatically generate images for articles
- [ ] Scheduled publishing
- [ ] i18n support

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

### Step 1: Get your Project Key
Sign into your [nxtblog.ai](https://nxtblog.ai/dashboard) account and create a new project. You can copy your project key in your project dashboard.

### Step 2: Initialize nxtblog.ai in Your Next.js Project
Use the project key to initialize nxtblog.ai in your Next.js project.
The following command will create a new dynamic route in your Next.js app where your blog posts will be published with our prebuilt components. It will use the route you specified when creating your project. If you chose "/blog", it will create a new route /blog/[articlePath] where your blog posts will be published.
```bash
npx nxtblog-ai init --project-key <your-project-key>
```

### Step 3: Add environment variables
Add your project key and the CDN URL to your .env file. You can find the project key in your project dashboard.
    
```bash
# .env
# ... your other env variables ...
NEXT_ARTICLE_CDN_URL="https://nxtblog.ai/api/cdn"
NEXT_ARTICLE_PROJECT_KEY=your-project-key-here
```

### Step 4: Enable Image Support (Optional)
To enable images in your blog posts, add the following to your next.config.js file to allow our CDN to serve the images to your server.
```javascript
// next.config.js
const config = {
    // ... your other next options ...
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "nxtblog.ai",
                pathname: "/api/cdn/**"
            }
        ]
    }
};

export default config;
```

That’s it! You’re fully setup to generate SEO-optimized articles for your blog in our dashboard. They will be published in real time to your Next.js application.
[learn more about generating articles](https://nxtblog.ai/docs/generate-articles)


## Customization

### Adding a Call to Action
You can add a call to action to your blog posts to encourage your readers to take action. To do this, add the following to your /app/\<your-blog-path>/[articlePath]/page.tsx file:
```tsx 
// /app/<your-blog-path>/[articlePath]/page.tsx
export default async function Page({
    params,
}: {
    params: Promise<{ articlePath: string; }>;
}) {
    const { articlePath } = await params;
    const content = await getPostContent(articlePath);
    const yourCallToAction = <div>nxblog.ai rocks!</div>; // your custom call to action
    return (
        <div>
             <BlogPost 
                articleData={content}
                callToAction={yourCallToAction} // add this here
            />
        </div>
    );
}
```

### Specifying a layout for your blog
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

### Changing the image styles
You can change the default image styles by passing the imageStyles prop to the BlogPost component. The imageStyles prop should be an object with css properties that you want to apply to the image. 

```tsx 
// /app/<your-blog-path>/[articlePath]/page.tsx
export default async function Page({
    params,
}: {
    params: Promise<{ articlePath: string; }>;
}) {
    const { articlePath } = await params;
    const content = await getPostContent(articlePath);
    return (
        <div>
             <BlogPost 
                articleData={content}
                imageStyles={{
                    borderRadius: "50%",
                    width: "100px",
                    height: "100px"
                }} // add this here
            />
        </div>
    );
}
```