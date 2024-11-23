# nxtblog.ai 🚀

Generate and publish SEO-optimized articles to your Next.js application within minutes. 

---

## Features
- **Effortless Integration:** Install and configure with your NextJS projects in just a few minutes.
- **SEO Optimization:** Generate articles optimized for search engines.
- **SSG out of the box:** Full support for static site generation, to ensure your site is fast and SEO-friendly.
- **Realtime updates:** Make changes to your content and see them reflected in your app in real-time.
- **Image Support:** Serve images seamlessly using our CDN.

---

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

## Setup

### Step 1: Initialize nxtblog.ai in Your Next.js Project
    
```bash
npx nxtblog-ai init --path blog
```
This will create a new dynamic route in your Next.js app where your blog posts will be published. For example, the above command sets up blog posts under the /blog path. You can customize this path using the --path argument.

### Step 2: Enable Image Support (Optional)
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

### Step 3: Step 3: Add Your Project Key

1. Sign into your [nxtblog.ai](https://nxtblog.ai) account.
2. Create a project and retrieve your project key from the project dashboard.
3. Add the key to your .env file:
    
```bash
# .env
# ... your other env variables ...
NEXT_ARTICLE_CDN_URL="https://nxtblog.ai/api/cdn"
NEXT_ARTICLE_PROJECT_KEY=your-project-key-here
```

That’s it! You’re ready to generate SEO-optimized articles for your blog in our dashboard.
[learn more about generating articles](https://nxtblog.ai/docs/generate-articles)
