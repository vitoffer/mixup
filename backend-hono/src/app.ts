import dbConnect from "./db/connect"
import createApp from "./lib/createApp"
import configOpenApi from "./lib/configOpenApi"
import indexRoute from "./routes/index.route"
import tracksRoute from "./routes/tracks/tracks.index"

dbConnect()

const app = createApp()

const routes = [indexRoute, tracksRoute]

configOpenApi(app)

routes.forEach((route) => {
	app.route("/", route)
})

export default app
