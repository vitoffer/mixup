import { createRouter } from "../../lib/createApp"

import * as routes from "./utils.routes"
import * as handlers from "./utils.handlers"

const router = createRouter().openapi(routes.ping, handlers.ping)

export default router
