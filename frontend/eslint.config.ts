import globals from "globals"
import pluginJs from "@eslint/js"
import pluginVue from "eslint-plugin-vue"
import pluginTs from "@typescript-eslint/eslint-plugin"

export default [
	{ files: ["**/*.{ts,tsx,vue}"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...pluginVue.configs["flat/essential"],
	{
		plugins: {
			"@typescript-eslint": pluginTs,
		},
		rules: {
			"vue/multi-word-component-names": [
				"error",
				{
					ignores: ["Branding", "Navigation"],
				},
			],
		},
	},
]
