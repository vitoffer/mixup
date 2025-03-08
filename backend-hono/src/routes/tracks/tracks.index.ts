import { createRouter } from "../../lib/createApp"

import * as handlers from "./tracks.handlers"
import * as routes from "./tracks.routes"

const router = createRouter()
	.openapi(routes.list, handlers.list)
	.openapi(routes.create, handlers.create)

export default router
