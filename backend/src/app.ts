import dbConnect from "./db/connect"
import createApp from "./lib/createApp"
import configOpenApi from "./lib/configOpenApi"
import tracksRoute from "./routes/tracks/tracks.index"
import apisRoute from "./routes/apis/apis.index"

const app = createApp()
configOpenApi(app)

await dbConnect()

const routes = [tracksRoute, apisRoute]
routes.forEach((route) => {
	app.route("/", route)
})

export default app
