import { RouteHandler } from "@hono/zod-openapi"
import { ListRoute } from "./tracks.routes"
import Track from "../../models/Track"
import * as HttpStatusCodes from "stoker/http-status-codes"

export const list: RouteHandler<ListRoute> = async (c) => {
	const tracks = await Track.find()

	return c.json(tracks, HttpStatusCodes.OK)
}
