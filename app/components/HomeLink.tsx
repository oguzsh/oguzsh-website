"use client";

import { sans } from "../fonts";
import { usePathname } from "next/navigation";
import Link from "./Link";

const HomeLink = () => {
	const pathname = usePathname();
	const isActive = pathname === "/";

	return (
		<Link
			href="/"
			className={[
				sans.className,
				"inline-block text-2xl font-black",
				isActive ? "text-ctp-text]" : "text-ctp-mauve hover:scale-[1.1]",
				"transition-all duration-200",
			].join(" ")}
		>
			{"{"} ozi {"}"}
		</Link>
	);
};

export default HomeLink;
