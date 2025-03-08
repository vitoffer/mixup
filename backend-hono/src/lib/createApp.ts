import { OpenAPIHono } from "@hono/zod-openapi"
import { cors } from "hono/cors"
import { logger } from "hono/logger"

export function createRouter() {
	return new OpenAPIHono({ strict: false })
}

export default function createApp() {
	const app = createRouter()

	app.use(logger())
	app.use("*", cors())

	return app
}
