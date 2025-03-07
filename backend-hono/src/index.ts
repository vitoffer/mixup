import { Hono } from "hono"
import { logger } from "hono/logger"

const app = new Hono()

app.use(logger())

app.get("/", (c) => {
	return c.text("Hello Hono!")
})

app.get("/ping", (c) => {
	return c.text("pong!")
})

export default {
	port: 4000,
	host: "0.0.0.0",
	fetch: app.fetch,
}
