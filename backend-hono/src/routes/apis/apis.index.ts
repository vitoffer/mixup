import { createRouter } from "../../lib/createApp"

import * as handlers from "./apis.handlers"
import * as routes from "./apis.routes"

const router = createRouter().openapi(
	routes.searchTracks,
	handlers.searchTracks
)

export default router
