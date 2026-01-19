import { notFound } from "next/navigation";
import { sans } from "../../../fonts";
import { getPosts } from "../../../lib/posts";
import type { Metadata } from "next";
import PostItem from "../../../components/PostItem";

export const generateStaticParams = async () => {
	const posts = await getPosts();
	if (posts.length === 0) return [{ slug: "not-found" }];

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
