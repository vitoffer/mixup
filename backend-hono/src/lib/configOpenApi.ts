import { OpenAPIHono } from "@hono/zod-openapi"
import packageJSON from "../../package.json"
import { apiReference } from "@scalar/hono-api-reference"

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
			theme: "deepSpace",
			defaultHttpClient: {
				targetKey: "js",
				clientKey: "fetch",
			},
		})
	)
}
