import { OpenAPIHono } from "@hono/zod-openapi"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { notFound, onError } from "stoker/middlewares"
import { defaultHook } from "stoker/openapi"

export function createRouter() {
	return new OpenAPIHono({ strict: false, defaultHook })
}

export default function createApp() {
	const app = createRouter()

	app.use(logger())
	app.use("*", cors())

	app.notFound(notFound)
	app.onError(onError)

	return app
}
