import dbConnect from "./db/connect"
import createApp from "./lib/createApp"
import configOpenApi from "./lib/configOpenApi"
import authRoute from "./routes/auth/auth.index"
import tracksRoute from "./routes/tracks/tracks.index"
import apisRoute from "./routes/apis/apis.index"
import utilsRoute from "./routes/utils/utils.index"

const app = createApp()
configOpenApi(app)

await dbConnect()

const routes = [authRoute, tracksRoute, apisRoute, utilsRoute]
routes.forEach((route) => {
	app.route("/", route)
})

export default app
