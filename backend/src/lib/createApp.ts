import { OpenAPIHono } from "@hono/zod-openapi"
import { serveStatic } from "hono/bun"
import { cors } from "hono/cors"
import { notFound, onError } from "stoker/middlewares"
import { defaultHook } from "stoker/openapi"
import { pinoLogger } from "@/middlewares/pinoLogger"
import { HTTPException } from "hono/http-exception"
import * as HttpStatusCodes from "stoker/http-status-codes"

export function createRouter() {
	return new OpenAPIHono({ strict: false, defaultHook })
}

function parseErrorText(text: string) {
	try {
		const { status, path, ...jsonData } = JSON.parse(text)

		return jsonData
	} catch (error) {
		return { error: "Invalid token", message: text }
	}
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
	app.onError(async (err, c) => {
		if (err instanceof HTTPException) {
			if (!err.res) {
				console.error(err)
				return c.json("Unknown error", HttpStatusCodes.INTERNAL_SERVER_ERROR)
			}

			const errorText = await err.res.text()
			const errorData = parseErrorText(errorText)

			return c.json(errorData, err.status)
		}

		return onError(err, c)
	})

	return app
}
