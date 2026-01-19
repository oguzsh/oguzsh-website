import { sans } from "./fonts";
import Link from "./components/Link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
			<h1
				className={`${sans.className} text-6xl font-black mb-4 text-ctp-mauve`}
			>
				404
			</h1>
			<h2 className={`${sans.className} text-2xl font-bold mb-4 text-ctp-text`}>
				Page Not Found
			</h2>
			<p className="text-ctp-subtext0 mb-8 max-w-md">
				Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
				moved.
			</p>
			<Link
				href="/"
				className="inline-flex items-center gap-2 px-6 py-3 bg-ctp-surface0 hover:bg-ctp-surface1 rounded-lg text-ctp-text transition-colors"
			>
				<span>←</span>
				<span>Back to Home</span>
			</Link>
		</div>
	);
}
