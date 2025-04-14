import app from "./app"
import env from "./env"

const port = env.BACKEND_PORT

export default {
	port: port,
	host: "0.0.0.0",
	fetch: app.fetch,
}
