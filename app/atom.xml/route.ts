import { generateFeed } from "../lib/posts";

export const dynamic = "force-static";

export const GET = async () => {
	const feed = await generateFeed();
	return new Response(feed.atom1(), {
		headers: {
			"Content-Type": "application/atom+xml; charset=utf-8",
		},
	});
};
