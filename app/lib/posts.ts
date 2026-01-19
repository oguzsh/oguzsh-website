import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { Feed } from "feed";

export interface Post {
	slug: string;
	title: string;
	date: string;
	spoiler: string;
	tags?: string[];
	category?: string;
}

export const siteMetadata = {
	title: "Oguzhan Ince - Sr. Software Engineer",
	description:
		"Sr. Software Engineer, AI Tinkerer, helping others build great software.",
	siteUrl: "https://oguzhanince.com",
	author: {
		name: "Oguzhan Ince",
		email: "oguzhan824@gmail.com",
	},
};

// Module-level cache for build-time optimization
let postsCache: Post[] | null = null;

export const getPosts = async (): Promise<Post[]> => {
	// Return cached posts if available
	if (postsCache !== null) {
		return postsCache;
	}

	try {
		const entries = await readdir("./content/blog/", { withFileTypes: true });
		const dirs = entries
			.filter(entry => entry.isDirectory())
			.map(entry => entry.name);

		const fileContents = await Promise.all(
			dirs.map(dir => readFile("./content/blog/" + dir + "/index.md", "utf8")),
		);

		const posts = dirs.map((slug, i) => {
			const fileContent = fileContents[i];
			const { data } = matter(fileContent);
			return { slug, ...data } as Post;
		});

		posts.sort((a, b) => {
			return Date.parse(a.date) < Date.parse(b.date) ? 1 : -1;
		});

		// Cache the results
		postsCache = posts;
		return posts;
	} catch {
		// Return empty array if no posts exist yet
		return [];
	}
};

export const getPost = async (
	slug: string,
): Promise<{ content: string; data: Post } | null> => {
	try {
		const file = await readFile(`./content/blog/${slug}/index.md`, "utf8");
		const { content, data } = matter(file);
		return { content, data: { slug, ...data } as Post };
	} catch {
		return null;
	}
};

export const generateFeed = async () => {
	const posts = await getPosts();

	const feedOptions = {
		author: {
			name: siteMetadata.author.name,
			email: siteMetadata.author.email,
			link: siteMetadata.siteUrl,
		},
		description: siteMetadata.description,
		favicon: `${siteMetadata.siteUrl}/favicon.ico`,
		feedLinks: {
			atom: `${siteMetadata.siteUrl}/atom.xml`,
			rss: `${siteMetadata.siteUrl}/rss.xml`,
		},
		generator: "Next.js",
		id: siteMetadata.siteUrl,
		image: `${siteMetadata.siteUrl}/avatar.jpg`,
		link: siteMetadata.siteUrl,
		title: siteMetadata.title,
		copyright: `© ${new Date().getFullYear()} ${siteMetadata.author.name}`,
	};

	const feed = new Feed(feedOptions);

	for (const post of posts) {
		feed.addItem({
			date: new Date(post.date),
			description: post.spoiler,
			id: `${siteMetadata.siteUrl}/blog/${post.slug}/`,
			link: `${siteMetadata.siteUrl}/blog/${post.slug}/`,
			title: post.title,
		});
	}

	return feed;
};
