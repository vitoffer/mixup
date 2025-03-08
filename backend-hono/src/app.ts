import { logger } from "hono/logger"
import { apiReference } from "@scalar/hono-api-reference"
import { OpenAPIHono } from "@hono/zod-openapi"
import { cors } from "hono/cors"
import dbConnect from "./db/connect"
import Track from "./models/Track"

const app = new OpenAPIHono()

dbConnect()

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

app.get("/tracks", async (c) => {
	const tracks = await Track.find()

	return c.json(tracks)
})

app.post("/tracks", async (c) => {
	const data = await c.req.json()

	if (!data.title) return c.text("error")

	const track = await Track.create(data)

	return c.json(track)
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
