import { createRouter } from "../../lib/createApp"

import * as handlers from "./auth.handlers"
import * as routes from "./auth.routes"

const router = createRouter()
	.openapi(routes.login, handlers.login)
	.openapi(routes.registerModerator, handlers.registerModerator)

export default router
