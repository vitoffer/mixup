import { zodSchema, extendZod, zId } from "@zodyac/zod-mongoose"
import { model } from "mongoose"
import { z } from "zod"

extendZod(z)

export const DefaultTrackSchema = z.object({
	title: z.string().min(1, "Title length must be more than 0"),
	urls: z
		.object({
			youtubeMusic: z
				.string()
				.min(1, "Youtube music url length must be more than 0")
				.nullable()
				.optional(),
			yandexMusic: z
				.string()
				.min(1, "Yandex music url length must be more than 0")
				.nullable()
				.optional(),
			spotify: z
				.string()
				.min(1, "Spotify url length must be more than 0")
				.nullable()
				.optional(),
		})
		.refine(
			(data) => Object.values(data).some((value) => value !== null),
			"Provide at least one music service link"
		),
	thumbnailUrl: z.string().nullable().default(null),
	artistNames: z
		.array(z.string().min(1, "Artist name length must be more than 0"))
		.default([]),
	tags: z
		.array(z.string().min(1, "Tag name length must be more than 0"))
		.default([]),
	mixedTracks: z.array(zId("Track")).default([]),
	isMix: z.boolean().default(false),
})

const MongoTrackSchema = zodSchema(DefaultTrackSchema, { timestamps: true })

MongoTrackSchema.pre("save", function (next) {
	this.isMix = this.mixedTracks.length > 0
	next()
})

const Track = model("Track", MongoTrackSchema)

export default Track

export const TrackSchema = DefaultTrackSchema.extend({
	_id: zId(),
	createdAt: z.date(),
	updatedAt: z.date(),
	__v: z.number(),
})

export const InsertTrackSchema = DefaultTrackSchema.omit({
	isMix: true,
})

// export const patchTracksSchema = insertTracksSchema.partial().openapi({
// 	example: {},
// })
