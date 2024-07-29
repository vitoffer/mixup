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
					light: "#a1c6bf",
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
			},
		},
	},

	plugins: [],
}
