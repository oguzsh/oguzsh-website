import { ImageResponse } from "next/og";

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";
export const dynamic = "force-static";
export const alt = "Oguzhan Ince";

const Image = async () => {
	// Fetch Montserrat Bold font from Google Fonts
	const fontData = await fetch(
		"https://fonts.gstatic.com/s/montserrat/v26/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2",
	).then(res => res.arrayBuffer());

	return new ImageResponse(
		<div
			style={{
				display: "flex",
				width: "100%",
				height: "100%",
				backgroundColor: "#1e1e2e",
				color: "#cdd6f4",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				gap: 40,
				fontFamily: "Montserrat",
			}}
		>
			<div
				style={{
					display: "flex",
					fontSize: 72,
					fontWeight: 700,
					background: "linear-gradient(135deg, #cba6f7, #f5c2e7, #89b4fa)",
					backgroundClip: "text",
					color: "transparent",
				}}
			>
				Oguzhan Ince
			</div>
			<div
				style={{
					display: "flex",
					fontSize: 32,
					color: "#a6adc8",
				}}
			>
				Sr. Software Engineer • AI Tinkerer • Helping Others Build
			</div>
		</div>,
		{
			...size,
			fonts: [
				{
					name: "Montserrat",
					data: fontData,
					style: "normal",
					weight: 700,
				},
			],
		},
	);
};

export default Image;
