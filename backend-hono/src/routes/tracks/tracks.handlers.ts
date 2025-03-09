import { RouteHandler } from "@hono/zod-openapi"
import { CreateRoute, GetOneRoute, ListRoute } from "./tracks.routes"
import Track from "../../models/Track"
import * as HttpStatusCodes from "stoker/http-status-codes"
import mongoose from "mongoose"
import * as HttpStatusPhrases from "stoker/http-status-phrases"

export const list: RouteHandler<ListRoute> = async (c) => {
	const tracks = await Track.find()

	return c.json(tracks, HttpStatusCodes.OK)
}

export const getOne: RouteHandler<GetOneRoute> = async (c) => {
	const { id } = c.req.valid("param")

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return c.json(
			{ message: "Incorrect Id" },
			HttpStatusCodes.UNPROCESSABLE_ENTITY
		)
	}

	const track = await Track.findById(id).exec()

	if (!track) {
		return c.json(
			{ message: HttpStatusPhrases.NOT_FOUND },
			HttpStatusCodes.NOT_FOUND
		)
	}

	return c.json(track, HttpStatusCodes.OK)
}

export const create: RouteHandler<CreateRoute> = async (c) => {
	const track = c.req.valid("json")

	const inserted = (await Track.create(track)).toObject()

	return c.json(inserted, HttpStatusCodes.CREATED)
}
