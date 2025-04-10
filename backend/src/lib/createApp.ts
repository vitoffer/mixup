import { OpenAPIHono } from "@hono/zod-openapi"
import { serveStatic } from "hono/bun"
import { cors } from "hono/cors"
import { notFound, onError } from "stoker/middlewares"
import { defaultHook } from "stoker/openapi"
import { pinoLogger } from "@/middlewares/pinoLogger"
import { jwt } from "hono/jwt"
import env from "@/env"

export function createRouter() {
	return new OpenAPIHono({ strict: false, defaultHook })
}

export default function createApp() {
	const app = createRouter()

	app
		.use(pinoLogger())
		.use("*", cors())
		.use(jwt({ secret: env.JWT_SECRET }))

		.use("/public/*", serveStatic({ root: "./" }))

	app.notFound(notFound)
	app.onError(onError)

	return app
}
