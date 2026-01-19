import HomeLink from "../../components/HomeLink";

export default function BlogPostLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{children}
			<footer className="mt-16 pt-8 border-t border-[var(--surface0)]">
				<HomeLink />
			</footer>
		</>
	);
}
