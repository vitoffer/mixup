import { OpenAPIHono } from "@hono/zod-openapi"
import { serveStatic } from "hono/bun"
import { cors } from "hono/cors"
import { notFound, onError } from "stoker/middlewares"
import { defaultHook } from "stoker/openapi"
import { pinoLogger } from "@/middlewares/pino-logger"

export function createRouter() {
	return new OpenAPIHono({ strict: false, defaultHook })
}

export default function createApp() {
	const app = createRouter()

	app
		.use("*", cors())
		.use(pinoLogger())

		.use("/public/*", serveStatic({ root: "./" }))

	app.notFound(notFound)
	app.onError(onError)

	return app
}
