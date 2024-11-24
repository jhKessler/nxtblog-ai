# nxtblog.ai

Generate and publish SEO-optimized articles to your Next.js application within minutes 🚀

---

## Features
- **Effortless Integration:** Install and configure with your NextJS projects in just a few minutes.
- **SEO Optimization:** Generate articles optimized for search engines.
- **SSG out of the box:** Full support for static site generation, to ensure your site is fast and SEO-friendly.
- **Realtime updates:** Make changes to your content and see them reflected in your app in real-time.
- **Image Support:** Serve images seamlessly using our CDN.

---

## Disclaimer
This package is still untested with older NextJS versions than 15, if you run into any issues while setting up, please open an issue and we will look into it ASAP!

---

## Coming Soon:
- [ ] Pages router support
- [ ] Option to autogenerate images for articles
- [ ] Scheduled publishing

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
Sign into your [nxtblog.ai](https://nxtblog.ai) account and create a new project. You can get your project key from the project dashboard.

### Step 2: Initialize nxtblog.ai in Your Next.js Project
Use your project key to initialize nxtblog.ai in your Next.js project. After installing the package, run the following command in your terminal:
```bash
npx nxtblog-ai init --project-key <your-project-key>
```
This will create a new dynamic route in your Next.js app where your blog posts will be published with our prebuilt components. It will use the route you specified when creating your project. If you chose "/blog", it will create a new route /blog/[articlePath] where your blog posts will be published.

### Step 3: Enable Image Support (Optional)
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
Add your project key and the CDN URL to your .env file (or whatever method you use to manage your environment variables). You can find the CDN URL in your project dashboard.
    
```bash
# .env
# ... your other env variables ...
NEXT_ARTICLE_CDN_URL="https://nxtblog.ai/api/cdn"
NEXT_ARTICLE_PROJECT_KEY=your-project-key-here
```

That’s it! You’re fully setup to generate SEO-optimized articles for your blog in our dashboard. They will be published in real time to your Next.js application.
[learn more about generating articles](https://nxtblog.ai/docs/generate-articles)


