import { Montserrat, Merriweather } from "next/font/google";

export const sans = Montserrat({
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "500", "600", "700", "900"],
	style: ["normal"],
	variable: "--font-sans",
});

export const serif = Merriweather({
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "700"],
	style: ["normal", "italic"],
	variable: "--font-serif",
});
