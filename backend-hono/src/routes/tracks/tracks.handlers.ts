import { RouteHandler } from "@hono/zod-openapi"
import { CreateRoute, ListRoute } from "./tracks.routes"
import Track from "../../models/Track"
import * as HttpStatusCodes from "stoker/http-status-codes"

export const list: RouteHandler<ListRoute> = async (c) => {
	const tracks = await Track.find()

	return c.json(tracks, HttpStatusCodes.OK)
}

export const create: RouteHandler<CreateRoute> = async (c) => {
	const track = c.req.valid("json")

	const inserted = (await Track.create(track)).toObject()

	return c.json(inserted, HttpStatusCodes.CREATED)
}
