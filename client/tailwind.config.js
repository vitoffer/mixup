/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				gray: {
					DEFAULT: "#0d1f2d",
					light: "#253542",
				},
				yellow: {
					DEFAULT: "#ffc53a",
					light: "#ffe29d",
				},
				red: "#f25445",
				cyan: {
					DEFAULT: "#79aea3",
					light: "#C9DFDA",
					accent: "#A1C6BF",
				},
				transparent: "transparent",
			},
			fontFamily: {
				primary: "Open Sans",
				accent: "Nunito Sans 10pt",
				holtwood: "Holtwood One SC",
			},
			boxShadow: {
				card: "4px 0px 4px 0px rgba(121, 174, 163, 0.2), 0px 4px 4px 0px rgba(121, 174, 163, 0.2), -4px 0px 4px 0px rgba(121, 174, 163, 0.2), 0px -4px 4px 0px rgba(121, 174, 163, 0.2), 4px 0px 4px 0px rgba(121, 174, 163, 0.2) inset, 0px 4px 4px 0px rgba(121, 174, 163, 0.2) inset, -4px 0px 4px 0px rgba(121, 174, 163, 0.2) inset, 0px -4px 4px 0px rgba(121, 174, 163, 0.2) inset",
				link: "1px 0px 4px 0px rgba(255, 226, 157, 0.2), 0px 1px 4px 0px rgba(255, 226, 157, 0.2), -1px 0px 4px 0px rgba(255, 226, 157, 0.2), 0px -1px 4px 0px rgba(255, 226, 157, 0.2), 2px 0px 4px 0px rgba(255, 226, 157, 0.2) inset, 0px 2px 4px 0px rgba(255, 226, 157, 0.2) inset, -2px 0px 4px 0px rgba(255, 226, 157, 0.2) inset, 0px -2px 4px 0px rgba(255, 226, 157, 0.2) inset",
			},
			maxWidth: {
				"256px": "256px",
				"100%": "100%",
			},
			width: {
				"100%": "100%",
			},
		},
	},

	plugins: [],
}
