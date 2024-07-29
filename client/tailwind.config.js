/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
	theme: {
		extend: {},
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
				light: "#a1c6bf",
			},
		},
		fontFamily: {
			"open-sans": "Open Sans",
			"nunito-sans": "Nunito Sans 10pt",
			holtwood: "Holtwood One SC",
		},
	},
	plugins: [],
}
