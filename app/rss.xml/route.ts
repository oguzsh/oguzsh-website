import { generateFeed } from "../lib/posts";

export const dynamic = "force-static";

export const GET = async () => {
	const feed = await generateFeed();
	return new Response(feed.rss2(), {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
		},
	});
};
