import Link from "next/link";
import { sans } from "../fonts";
import { Post } from "../lib/posts";

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

export default PostItem;
