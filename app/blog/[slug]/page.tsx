import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { sans } from "../../fonts";
import { notFound } from "next/navigation";
import remarkSmartpants from "remark-smartypants";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import * as components from "./components";
import Link from "next/link";
import "./markdown.css";

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;

	let file: string;
	try {
		file = await readFile(`./content/blog/${slug}/index.md`, "utf8");
	} catch {
		notFound();
	}

	const { content, data } = matter(file);

	return (
		<article>
			<header className="mb-10">
				<div className="flex flex-col gap-4">
					<h1
						className={`${sans.className} text-[2.5rem] font-black leading-tight text-[var(--text)]`}
					>
						{data.title}
					</h1>
					<div className="flex items-center gap-3 text-ctp-subtext0">
						<time dateTime={data.date}>
							{new Date(data.date).toLocaleDateString("en", {
								day: "numeric",
								month: "long",
								year: "numeric",
							})}
						</time>
						{data.category && (
							<>
								<span className="w-1 h-1 rounded-full bg-ctp-surface2" />
								<Link
									href={`/blog/category/${data.category.toLowerCase().replace(/\s+/g, "-")}`}
									className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-ctp-surface1 text-ctp-subtext1 hover:bg-ctp-surface2 hover:text-ctp-text transition-colors"
								>
									{data.category}
								</Link>
							</>
						)}
					</div>
				</div>
			</header>

			<div className="markdown">
				<MDXRemote
					source={content}
					components={{
						p: components.P,
						h2: components.H2,
						h3: components.H3,
						h4: components.H4,
						blockquote: components.Blockquote,
						ul: components.UL,
						ol: components.OL,
						li: components.LI,
						pre: components.Pre,
						code: components.Code,
						table: components.Table,
						th: components.Th,
						td: components.Td,
						hr: components.Hr,
						a: components.A,
						img: async ({ src, ...rest }) => {
							// Handle relative image paths
							let finalSrc = src;
							if (src && !/^https?:\/\//.test(src)) {
								finalSrc = `/blog/${slug}/${src}`;
							}
							return <components.Img src={finalSrc} {...rest} />;
						},
					}}
					options={{
						mdxOptions: {
							remarkPlugins: [remarkSmartpants, remarkGfm],
							rehypePlugins: [
								[
									rehypePrettyCode,
									{
										theme: "catppuccin-mocha",
										keepBackground: false,
										defaultLang: { block: "text" },
									},
								],
								rehypeSlug,
							],
						},
					}}
				/>
			</div>
		</article>
	);
};

export default PostPage;

export const generateStaticParams = async () => {
	try {
		const entries = await readdir("./content/blog/", { withFileTypes: true });
		if (entries.length === 0) return [{ slug: "not-found" }];

		const dirs = entries
			.filter(entry => entry.isDirectory())
			.map(entry => entry.name);

		if (dirs.length === 0) return [{ slug: "not-found" }];

		return dirs.map(dir => ({ slug: dir }));
	} catch {
		return [];
	}
};

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ slug: string }>;
}) => {
	const { slug } = await params;

	try {
		const file = await readFile(`./content/blog/${slug}/index.md`, "utf8");
		const { data } = matter(file);
		return {
			title: data.title,
			description: data.spoiler,
		};
	} catch {
		return {
			title: "Post Not Found",
		};
	}
};
