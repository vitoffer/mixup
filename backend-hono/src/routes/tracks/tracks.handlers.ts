import { RouteHandler } from "@hono/zod-openapi"
import {
	CreateRoute,
	GetOneRoute,
	ListRoute,
	PatchRoute,
} from "./tracks.routes"
import Track from "../../models/Track"
import * as HttpStatusCodes from "stoker/http-status-codes"
import * as HttpStatusPhrases from "stoker/http-status-phrases"

export const list: RouteHandler<ListRoute> = async (c) => {
	const tracks = await Track.find()

	return c.json(tracks, HttpStatusCodes.OK)
}

export const getOne: RouteHandler<GetOneRoute> = async (c) => {
	const { id } = c.req.valid("param")

	const track = await Track.findById(id)

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

export const patch: RouteHandler<PatchRoute> = async (c) => {
	const { id } = c.req.valid("param")
	const updates = c.req.valid("json")

	const track = await Track.findByIdAndUpdate(id, updates, {
		new: true,
	})

	if (!track) {
		return c.json(
			{ message: HttpStatusPhrases.NOT_FOUND },
			HttpStatusCodes.NOT_FOUND
		)
	}

	return c.json(track.toObject(), HttpStatusCodes.OK)
}
