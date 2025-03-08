import app from "./app"

const port = process.env.NODE_ENV ? process.env.BACKEND_PORT || 4000 : 4000

export default {
	port: port,
	host: "0.0.0.0",
	fetch: app.fetch,
}
