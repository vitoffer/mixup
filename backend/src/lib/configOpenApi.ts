import { apiReference } from "@scalar/hono-api-reference"
import { AppOpenAPI } from "./types"
import packageJSON from "../../package.json" with {type: "json"}
import env from "@/env"

export default function configOpenApi(app: AppOpenAPI) {
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
			authentication: {
				preferredSecurityScheme: "Bearer",
			}
		})
	)
}
