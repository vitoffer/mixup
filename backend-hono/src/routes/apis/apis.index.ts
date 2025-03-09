import { createRouter } from "../../lib/createApp"

import * as handlers from "./apis.handlers"
import * as routes from "./apis.routes"

const router = createRouter()
	.openapi(routes.searchSpotify, handlers.searchSpotify)
	.openapi(routes.searchYandexMusic, handlers.searchYandexMusic)

export default router
