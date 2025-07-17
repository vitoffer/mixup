import { AppRouteHandler } from "@/lib/types"
import { PingRoute } from "./utils.routes"
import * as HttpStatusCodes from "stoker/http-status-codes"

export const ping: AppRouteHandler<PingRoute> = async (c) => {
	return c.json({ message: `pong` }, HttpStatusCodes.OK)
}
