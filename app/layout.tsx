import type { Metadata } from "next";
import HomeLink from "./components/HomeLink";
import { sans, serif } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://oguzhanince.com"),
	title: {
		default: "Oguzhan Ince - Sr. Software Engineer & AI Tinkerer",
		template: "%s | Oguzhan Ince",
	},
	description:
		"Sr. Software Engineer, AI Tinkerer, helping others build great software.",
	keywords: [
		"software engineer",
		"AI",
		"web development",
		"blog",
		"Oguzhan Ince",
	],
	authors: [{ name: "Oguzhan Ince" }],
	creator: "Oguzhan Ince",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://oguzhanince.com",
		siteName: "Oguzhan Ince",
		title: "Oguzhan Ince - Sr. Software Engineer & AI Tinkerer",
		description:
			"Sr. Software Engineer, AI Tinkerer, helping others build great software.",
	},
	twitter: {
		card: "summary_large_image",
		title: "Oguzhan Ince - Sr. Software Engineer & AI Tinkerer",
		description:
			"Sr. Software Engineer, AI Tinkerer, helping others build great software.",
	},
	icons: {
		icon: [
			{ url: "/favicon.svg", type: "image/svg+xml" },
			{ url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
		],
		apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
	},
	manifest: "/site.webmanifest",
	alternates: {
		types: {
			"application/atom+xml": "https://oguzhanince.com/atom.xml",
			"application/rss+xml": "https://oguzhanince.com/rss.xml",
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${sans.variable} ${serif.variable}`}>
			<head>
				<script
					defer
					src="https://cloud.umami.is/script.js"
					data-website-id="e0a5a209-1b8d-4767-9f39-3755797bab63"
				></script>
			</head>
			<body className="mx-auto max-w-2xl px-5 py-12 bg-ctp-base text-ctp-text font-serif">
				<header className="mb-14 flex flex-row place-content-between items-center">
					<HomeLink />
				</header>
				<main>{children}</main>
			</body>
		</html>
	);
}
