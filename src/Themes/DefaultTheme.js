import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	fonts: {
		heading: `'Inter', sans-serif`,
		body: `'Inter', sans-serif`,
		input: `'Inter', sans-serif`,
	},
	fontSizes: {
		xs: "12px",
		sm: "14px",
		md: "16px",
		lg: "18px",
		xl: "20px",
		"2xl": "24px",
		"3xl": "28px",
		"4xl": "36px",
		"5xl": "48px",
		"6xl": "64px",
	},
	styles: {
		global: {
			body: {
				fontSize: "14px",
			},
		},
	},
});

export default theme;
