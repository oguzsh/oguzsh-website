import Link from "../components/Link";
import { sans } from "../fonts";
import { getPosts, Post } from "../lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog",
	description: "Thoughts on software engineering, AI, and more.",
};

const BlogPage = async () => {
	const posts = await getPosts();

	return (
		<div>
			{posts.length === 0 ? (
				<p className="text-ctp-subtext0 italic">
					No posts yet. Check back soon!
				</p>
			) : (
				<div className="flex flex-col gap-8">
					{posts.map(post => (
						<PostItem key={post.slug} post={post} />
					))}
				</div>
			)}
		</div>
	);
};

export default BlogPage;

const PostItem = ({ post }: { post: Post }) => {
	return (
		<div className="group relative block py-4 -mx-4 px-4 rounded-lg hover:bg-ctp-surface0 transition-colors">
			<article>
				<div className="flex items-center justify-between mb-2 gap-3">
					<h2
						className={`${sans.className} text-[28px] font-black leading-snug text-ctp-mauve group-hover:text-ctp-pink transition-colors`}
					>
						<Link href={`/blog/${post.slug}/`}>
							<span className="absolute inset-0" aria-hidden="true" />
							{post.title}
						</Link>
					</h2>
					{post.category && (
						<Link
							href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`}
							className="relative z-10 text-sm font-medium px-2.5 py-0.5 rounded-full bg-ctp-surface1 text-ctp-subtext1 hover:bg-ctp-surface2 hover:text-ctp-text transition-colors shrink-0"
						>
							{post.category}
						</Link>
					)}
				</div>
				<p className="text-sm text-ctp-subtext0 mb-2">
					{new Date(post.date).toLocaleDateString("en", {
						day: "numeric",
						month: "long",
						year: "numeric",
					})}
				</p>
				<p className="text-ctp-subtext1 leading-relaxed">{post.spoiler}</p>
			</article>
		</div>
	);
};
