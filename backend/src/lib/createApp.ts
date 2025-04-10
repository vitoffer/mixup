import { OpenAPIHono } from "@hono/zod-openapi"
import { serveStatic } from "hono/bun"
import { cors } from "hono/cors"
import { notFound, onError } from "stoker/middlewares"
import { defaultHook } from "stoker/openapi"
import { pinoLogger } from "@/middlewares/pinoLogger"

export function createRouter() {
	return new OpenAPIHono({ strict: false, defaultHook })
}

export default function createApp() {
	const app = createRouter()

	app
		.use(pinoLogger())
		.use("*", cors())

		.use("/public/*", serveStatic({ root: "./" }))

	app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
		type: "http",
		scheme: "bearer",
	})

	app.notFound(notFound)
	app.onError(onError)

	return app
}
