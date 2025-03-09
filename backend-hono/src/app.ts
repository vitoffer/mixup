import dbConnect from "./db/connect"
import createApp from "./lib/createApp"
import configOpenApi from "./lib/configOpenApi"
import tracksRoute from "./routes/tracks/tracks.index"

const app = createApp()
configOpenApi(app)

await dbConnect()

const routes = [tracksRoute]
routes.forEach((route) => {
	app.route("/", route)
})

export default app
