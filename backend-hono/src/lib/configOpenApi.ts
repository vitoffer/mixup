import { OpenAPIHono } from "@hono/zod-openapi"
import packageJSON from "../../package.json"

export default function configOpenApi(app: OpenAPIHono) {
	app.doc("/doc", {
		openapi: "3.0.0",
		info: {
			version: packageJSON.version,
			title: "Mixup API",
		},
	})
}
