import { notFound } from "next/navigation";
import Link from "next/link";
import { sans } from "../../../fonts";
import { getPosts, Post } from "../../../lib/posts";
import type { Metadata } from "next";

export const generateStaticParams = async () => {
	const posts = await getPosts();
	const categories = new Set(posts.map(post => post.category).filter(Boolean));

	return Array.from(categories).map(category => ({
		slug: category!.toLowerCase().replace(/\s+/g, "-"),
	}));
};

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
	const { slug } = await params;
	const categoryName = slug
		.split("-")
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

	return {
		title: `${categoryName} Posts`,
		description: `Blog posts about ${categoryName}`,
	};
};

const CategoryPage = async ({
	params,
}: {
	params: Promise<{ slug: string }>;
}) => {
	const { slug } = await params;
	const posts = await getPosts();

	const filteredPosts = posts.filter(post => {
		if (!post.category) return false;
		const postCategorySlug = post.category.toLowerCase().replace(/\s+/g, "-");
		return postCategorySlug === slug;
	});

	if (filteredPosts.length === 0) {
		notFound();
	}

	const categoryName = filteredPosts[0].category!;

	return (
		<div>
			<h1
				className={`${sans.className} text-3xl font-black mb-8 text-ctp-mauve`}
			>
				{categoryName}
			</h1>

			<div className="flex flex-col gap-8">
				{filteredPosts.map(post => (
					<PostItem key={post.slug} post={post} />
				))}
			</div>
		</div>
	);
};

export default CategoryPage;

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
