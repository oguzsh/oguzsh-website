import Link from "./components/Link";

import DynamicGreeting from "./components/DynamicGreeting";
import { sans } from "./fonts";
import { getPosts, Post } from "./lib/posts";

import { readFile } from "fs/promises";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkSmartpants from "remark-smartypants";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
	const file = await readFile("./content/about/index.md", "utf8");
	const { data } = matter(file);
	return {
		title: data.title,
		description: data.description,
	};
};

const P = (props: React.ComponentProps<"p">) => {
	return <p className="text-ctp-text leading-relaxed mb-4" {...props} />;
};

const H2 = (props: React.ComponentProps<"h2">) => {
	return (
		<h2 className="text-2xl font-bold font-sans text-ctp-mauve" {...props} />
	);
};

const Strong = (props: React.ComponentProps<"strong">) => {
	return <strong className="font-bold text-ctp-mauve" {...props} />;
};

const A = (props: React.ComponentProps<"a">) => {
	return (
		<Link
			className="text-ctp-blue hover:text-ctp-sapphire border-b border-ctp-blue hover:border-transparent transition-colors"
			href={props.href || ""}
			{...props}
		/>
	);
};

const Home = async () => {
	const posts = await getPosts();
	const recentPosts = posts.slice(0, 5);

	const file = await readFile("./content/about/index.md", "utf8");
	const { content } = matter(file);

	return (
		<div className="space-y-16">
			{/* Hero Section */}
			<section className="space-y-2">
				<h1
					className={`${sans.className} text-4xl sm:text-5xl font-black leading-tight`}
				>
					<span className="text-ctp-mauve">
						<DynamicGreeting />
					</span>
				</h1>
			</section>

			{/* About Section */}
			<div className="markdown">
				<MDXRemote
					source={content}
					components={{
						p: P,
						h2: H2,
						strong: Strong,
						a: A,
					}}
					options={{
						mdxOptions: {
							remarkPlugins: [remarkSmartpants, remarkGfm],
						},
					}}
				/>
			</div>

			{/* Recent Posts Section */}
			<section>
				<div className="flex items-center justify-between mb-6">
					<h2 className={`${sans.className} text-2xl font-bold text-ctp-mauve`}>
						Recent Posts
					</h2>
					{posts.length > 5 ? (
						<Link
							href="/blog/"
							className="text-sm text-ctp-subtext0 hover:text-ctp-pink"
						>
							View all →
						</Link>
					) : null}
				</div>

				{recentPosts.length === 0 ? (
					<p className="text-ctp-subtext0 italic">
						No posts yet. Check back soon!
					</p>
				) : (
					<div className="flex flex-col gap-6">
						{recentPosts.map(post => (
							<PostCard key={post.slug} post={post} />
						))}
					</div>
				)}
			</section>
		</div>
	);
};

export default Home;

const PostCard = ({ post }: { post: Post }) => {
	return (
		<div className="group relative block py-3 -mx-3 px-3 rounded-lg hover:bg-ctp-surface0 transition-colors">
			<article>
				<div className="flex items-center justify-between mb-1 gap-2">
					<h3
						className={`${sans.className} text-xl font-bold leading-snug text-ctp-pink group-hover:text-ctp-flamingo transition-colors`}
					>
						<Link href={`/blog/${post.slug}/`}>
							<span className="absolute inset-0" aria-hidden="true" />
							{post.title}
						</Link>
					</h3>
					{post.category && (
						<Link
							href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`}
							className="relative z-10 text-xs font-medium px-2 py-0.5 rounded-full bg-ctp-surface1 text-ctp-subtext1 hover:bg-ctp-surface2 hover:text-ctp-text transition-colors shrink-0"
						>
							{post.category}
						</Link>
					)}
				</div>
				<p className="text-sm text-ctp-subtext0 mb-1">
					{new Date(post.date).toLocaleDateString("en", {
						day: "numeric",
						month: "long",
						year: "numeric",
					})}
				</p>
				<p className="text-ctp-subtext1">{post.spoiler}</p>
			</article>
		</div>
	);
};
