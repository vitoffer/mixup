import { apiReference } from "@scalar/hono-api-reference"
import dbConnect from "./db/connect"
import createApp from "./lib/createApp"
import configOpenApi from "./lib/configOpenApi"
import indexRoute from "./routes/index.route"

dbConnect()

const app = createApp()

const routes = [indexRoute]

configOpenApi(app)

routes.forEach((route) => {
	app.route("/", route)
})

export default app
