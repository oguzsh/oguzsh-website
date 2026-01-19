import { getPosts } from "../lib/posts";
import type { Metadata } from "next";
import PostItem from "../components/PostItem";

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
