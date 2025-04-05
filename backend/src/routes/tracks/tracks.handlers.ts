import { RouteHandler, z } from "@hono/zod-openapi"
import {
	CreateRoute,
	GetOneRoute,
	ListRoute,
	PatchRoute,
	RemoveRoute,
} from "./tracks.routes"
import * as HttpStatusCodes from "stoker/http-status-codes"
import * as HttpStatusPhrases from "stoker/http-status-phrases"
import { DbPopulatedTrackSchema, Track } from "../../models/Track"
import { normalizeTrack } from "./helpers"

export const list: RouteHandler<ListRoute> = async (c) => {
	const tracks = await Track.find().populate("originalTracks")

	return c.json(tracks, HttpStatusCodes.OK)
}

export const getOne: RouteHandler<GetOneRoute> = async (c) => {
	const { id } = c.req.valid("param")

	const track = await Track.findById(id).populate("originalTracks")

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

	const rawInsertedTrack = await Track.create(track)
	const populatedInsertedTrack = (await rawInsertedTrack.populate(
		"originalTracks"
	)) as z.infer<typeof DbPopulatedTrackSchema>

	const normalizedInsertedTrack = normalizeTrack(populatedInsertedTrack)

	return c.json(normalizedInsertedTrack, HttpStatusCodes.CREATED)
}

export const patch: RouteHandler<PatchRoute> = async (c) => {
	const { id } = c.req.valid("param")
	const updates = c.req.valid("json")

	const rawUpdatedTrack = await Track.findByIdAndUpdate(
		id,
		{ ...updates, updatedAt: new Date() },
		{
			new: true,
		}
	)

	if (!rawUpdatedTrack) {
		return c.json(
			{ message: HttpStatusPhrases.NOT_FOUND },
			HttpStatusCodes.NOT_FOUND
		)
	}

	const populatedUpdatedTrack = (await rawUpdatedTrack.populate(
		"originalTracks"
	)) as z.infer<typeof DbPopulatedTrackSchema>

	return c.json(populatedUpdatedTrack, HttpStatusCodes.OK)
}

export const remove: RouteHandler<RemoveRoute> = async (c) => {
	const { id } = c.req.valid("param")

	const result = await Track.deleteOne({ _id: id })

	if (result.deletedCount === 0) {
		return c.json(
			{ message: HttpStatusPhrases.NOT_FOUND },
			HttpStatusCodes.NOT_FOUND
		)
	}

	return c.body(null, HttpStatusCodes.NO_CONTENT)
}
