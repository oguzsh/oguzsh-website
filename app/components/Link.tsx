"use client";

import { useTransition } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

const isModifiedEvent = (event: MouseEvent<HTMLAnchorElement>) => {
	const eventTarget = event.currentTarget;
	const target = eventTarget.getAttribute("target");
	return (
		(target && target !== "_self") ||
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey ||
		(event.nativeEvent && event.nativeEvent.button === 2)
	);
};

interface LinkProps extends React.ComponentProps<typeof NextLink> {
	className?: string;
	children?: React.ReactNode;
	style?: React.CSSProperties;
	href: string;
	target?: string;
}

const Link = ({
	className,
	children,
	style,
	href,
	target,
	...rest
}: LinkProps) => {
	const router = useRouter();
	const [isNavigating, trackNavigation] = useTransition();
	const isExternal = /^https?:\/\//.test(href);

	if (!target && isExternal) {
		target = "_blank";
	}

	return (
		<NextLink
			{...rest}
			target={target}
			rel={isExternal ? "noopener noreferrer" : undefined}
			href={href}
			onClick={e => {
				if (!isModifiedEvent(e) && !isExternal) {
					e.preventDefault();
					trackNavigation(() => {
						router.push(e.currentTarget.href);
					});
				}
			}}
			className={className}
			style={{
				...style,
				opacity: isNavigating ? 0.7 : 1,
				transition: "opacity 0.2s ease",
			}}
		>
			{children}
		</NextLink>
	);
};

export default Link;
