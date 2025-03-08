import { logger } from "hono/logger"
import { apiReference } from "@scalar/hono-api-reference"
import { OpenAPIHono } from "@hono/zod-openapi"
import { cors } from "hono/cors"

const app = new OpenAPIHono()

app.use(logger())

if (process.env.NODE_ENV !== "production") {
	app.use("*", cors())
}

app.get("/", (c) => {
	return c.text("Hello Hono!")
})

app.get("/ping", (c) => {
	return c.text("pong!")
})

app.get(
	"/reference",
	apiReference({
		spec: {
			url: "/doc",
		},
	})
)

app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "My API",
	},
})

export default app
