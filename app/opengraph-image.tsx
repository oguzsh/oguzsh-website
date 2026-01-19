import { ImageResponse } from "next/og";

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";
export const dynamic = "force-static";
export const alt = "Oguzhan Ince";

async function loadGoogleFont(font: string, text: string) {
	const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
	const css = await (await fetch(url)).text();
	const resource = css.match(
		/src: url\((.+)\) format\('(opentype|truetype)'\)/,
	);

	if (resource) {
		const response = await fetch(resource[1]);
		if (response.status == 200) {
			return await response.arrayBuffer();
		}
	}

	throw new Error("failed to load font data");
}

const Image = async () => {
	const fontData = await loadGoogleFont("Montserrat:wght@700", "Oguzhan Ince");

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
