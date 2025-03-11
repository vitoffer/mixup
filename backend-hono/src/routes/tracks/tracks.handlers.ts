import { RouteHandler, z } from "@hono/zod-openapi"
import {
	CreateRoute,
	GetOneRoute,
	ListRoute,
	RemoveRoute,
} from "./tracks.routes"
import Track, { TrackSchemaPopulated } from "../../models/Track"
import * as HttpStatusCodes from "stoker/http-status-codes"
import * as HttpStatusPhrases from "stoker/http-status-phrases"

export const list: RouteHandler<ListRoute> = async (c) => {
	const tracks = await Track.find().populate("mixedTracks")

	return c.json(tracks, HttpStatusCodes.OK)
}

export const getOne: RouteHandler<GetOneRoute> = async (c) => {
	const { id } = c.req.valid("param")

	const track = await Track.findById(id).populate("mixedTracks")

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
		"mixedTracks"
	)) as z.infer<typeof TrackSchemaPopulated>

	return c.json(populatedInsertedTrack, HttpStatusCodes.CREATED)
}

// export const patch: RouteHandler<PatchRoute> = async (c) => {
// 	const { id } = c.req.valid("param")
// 	const updates = c.req.valid("json")

// 	const track = await Track.findByIdAndUpdate(
// 		id,
// 		{ ...updates, updatedAt: new Date() },
// 		{
// 			new: true,
// 		}
// 	)

// 	if (!track) {
// 		return c.json(
// 			{ message: HttpStatusPhrases.NOT_FOUND },
// 			HttpStatusCodes.NOT_FOUND
// 		)
// 	}

// 	return c.json(track.toObject(), HttpStatusCodes.OK)
// }

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
