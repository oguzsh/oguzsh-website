"use client";

import Image from "next/image";
import Link from "../../components/Link";

export const P = (props: React.ComponentProps<"p">) => {
	return <p className="text-ctp-text" {...props} />;
};

export const H2 = ({ id, children, ...props }: React.ComponentProps<"h2">) => {
	return (
		<h2
			id={id}
			className="group relative text-3xl font-bold mt-8 mb-4 text-ctp-text font-serif"
			{...props}
		>
			<a href={`#${id}`} className="no-underline text-inherit">
				<span
					aria-hidden
					className="absolute -translate-x-[1em] opacity-0 group-hover:opacity-70 text-ctp-overlay1"
				>
					#
				</span>
				{children}
			</a>
		</h2>
	);
};

export const H3 = ({ id, children, ...props }: React.ComponentProps<"h3">) => {
	return (
		<h3
			id={id}
			className="group relative text-2xl font-bold mt-6 mb-3 text-ctp-text font-sans"
			{...props}
		>
			<a href={`#${id}`} className="no-underline text-inherit">
				<span
					aria-hidden
					className="absolute -translate-x-[1em] opacity-0 group-hover:opacity-70 text-ctp-overlay1"
				>
					#
				</span>
				{children}
			</a>
		</h3>
	);
};

export const H4 = ({ id, children, ...props }: React.ComponentProps<"h4">) => {
	return (
		<h4
			id={id}
			className="group relative text-xl font-bold mt-4 mb-2 text-ctp-text font-sans"
			{...props}
		>
			<a href={`#${id}`} className="no-underline text-inherit">
				<span
					aria-hidden
					className="absolute -translate-x-[1em] opacity-0 group-hover:opacity-70 text-ctp-overlay1"
				>
					#
				</span>
				{children}
			</a>
		</h4>
	);
};

export const Blockquote = (props: React.ComponentProps<"blockquote">) => {
	return (
		<blockquote
			className="border-l-3 border-ctp-mauve pl-4 -ml-4 italic text-ctp-subtext1"
			{...props}
		/>
	);
};

export const UL = (props: React.ComponentProps<"ul">) => {
	return <ul className="list-disc pl-6" {...props} />;
};

export const OL = (props: React.ComponentProps<"ol">) => {
	return <ol className="list-decimal pl-6" {...props} />;
};

export const LI = (props: React.ComponentProps<"li">) => {
	return <li className="mb-3 last:mb-0 text-ctp-text" {...props} />;
};

export const Pre = (props: React.ComponentProps<"pre">) => {
	return (
		<pre
			className="bg-ctp-crust rounded-xl p-4 overflow-x-auto text-sm"
			{...props}
		/>
	);
};

export const Code = ({
	className,
	...props
}: React.ComponentProps<"code"> & { "data-language"?: string }) => {
	// Code blocks have data-language from rehype-pretty-code
	if ("data-language" in props) {
		return <code className={className} {...props} />;
	}
	// Inline code styling
	return (
		<code
			className="bg-ctp-surface0 text-ctp-mauve px-1.5 py-0.5 rounded-md text-sm"
			{...props}
		/>
	);
};

export const Table = (props: React.ComponentProps<"table">) => {
	return <table className="w-full border-collapse" {...props} />;
};

export const Th = (props: React.ComponentProps<"th">) => {
	return (
		<th
			className="border border-ctp-surface1 p-3 text-left bg-ctp-surface0 font-semibold text-ctp-text"
			{...props}
		/>
	);
};

export const Td = (props: React.ComponentProps<"td">) => {
	return (
		<td className="border border-ctp-surface1 p-3 text-ctp-text" {...props} />
	);
};

export const Hr = (props: React.ComponentProps<"hr">) => {
	return <hr className="border-ctp-surface1 my-8" {...props} />;
};

export const Img = ({
	src,
	alt,
	...props
}: React.ComponentProps<typeof Image>) => {
	return (
		<Image
			src={src ?? ""}
			alt={alt ?? ""}
			width={800}
			height={450}
			sizes="(max-width: 768px) 100vw, 800px"
			className="max-w-full h-auto rounded-lg"
			{...props}
		/>
	);
};

export const A = (props: React.ComponentProps<"a">) => {
	if (props.href?.startsWith("/") || props.href?.startsWith("#")) {
		return (
			<Link
				href={props.href}
				className="text-ctp-blue hover:text-ctp-sapphire border-b border-ctp-blue hover:border-transparent transition-colors"
				{...props}
			/>
		);
	}
	return (
		<a
			className="text-ctp-blue hover:text-ctp-sapphire border-b border-ctp-blue hover:border-transparent transition-colors"
			target="_blank"
			rel="noopener noreferrer"
			{...props}
		/>
	);
};
