# Oguzhan Ince - Personal Website & Blog

Welcome to the source code of my personal website, [oguzhanince.com](https://oguzhanince.com). This project handles my portfolio, blog, and personal brand, built with modern web technologies.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Theme**: [Catppuccin Mocha](https://catppuccin.com/)
- **Content**: MDX (Markdown + JSX)
- **Deployment**: Vercel

## ✨ Key Features

- **Dynamic Blog System**: Built with MDX, supporting rich content, syntax highlighting (Shiki/Rehype), and custom components.
- **Category Filtering**: Organize posts by topic with filter badges (`/blog/category/[slug]`).
- **Performance**: Optimized with Next.js App Router, static generation, and font optimization (`next/font`).
- **SEO Ready**: Automatic metadata generation, OpenGraph images, and RSS/Atom feeds.

## 📂 Project Structure

```bash
├── app/                # Application source code (Next.js App Router)
│   ├── blog/           # Blog listing and category pages
│   ├── components/     # Reusable React components
│   ├── lib/            # Utility functions (posts parsing, etc.)
│   └── fonts.ts        # Font configurations
├── content/            # MDX Content
│   ├── about/          # About page content
│   └── blog/           # Blog posts
├── public/             # Static assets (images, fonts)
```

## 🛠️ Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Adding Content

### Blog Posts

Create a new folder in `content/blog/` with an `index.md` file:

```markdown
---
title: "My New Post"
date: "2024-03-20"
spoiler: "A brief summary of the post."
category: "Engineering"
---

Your content here...
```

### About Page

Edit `content/about/index.md` to update the about section.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
