import { OpenAPIHono } from "@hono/zod-openapi"
import packageJSON from "../../package.json"
import { apiReference } from "@scalar/hono-api-reference"
import env from "@/env"

export default function configOpenApi(app: OpenAPIHono) {
	app.doc("/doc", {
		openapi: "3.0.0",
		info: {
			version: packageJSON.version,
			title: "Mixup API",
		},
	})

	app.get(
		"/reference",
		apiReference({
			pageTitle: "Mixup API Reference",
			spec: {
				url: "doc",
			},
			servers: [{ url: env.VITE_BASE_API_URL }],
			theme: "deepSpace",
			defaultHttpClient: {
				targetKey: "js",
				clientKey: "axios",
			},
			favicon: "/public/favicon.ico",
		})
	)
}
