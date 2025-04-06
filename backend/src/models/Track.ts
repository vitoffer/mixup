import { zodSchema, extendZod, zId } from "@zodyac/zod-mongoose"
import { model } from "mongoose"
import { z } from "zod"

extendZod(z)

export const DefaultTrackSchema = z.object({
	title: z.string().min(1, "Title length must be more than 0"),
	artistsNames: z
		.array(z.string().min(1, "Artist name length must be more than 0"))
		.default([])
		.optional(),
	urls: z
		.object({
			spotify: z
				.string()
				.min(1, "Spotify url length must be more than 0")
				.nullable()
				.default(null)
				.optional(),
			yandexMusic: z
				.string()
				.min(1, "Yandex music url length must be more than 0")
				.nullable()
				.default(null)
				.optional(),
			youtubeMusic: z
				.string()
				.min(1, "Youtube music url length must be more than 0")
				.nullable()
				.default(null)
				.optional(),
		})
		.refine(
			(data) => Object.values(data).some((value) => value !== null),
			"Provide at least one music service link"
		),
	thumbnailUrl: z.string().nullable().default(null).optional(),
	tags: z
		.array(z.string().min(1, "Tag name length must be more than 0"))
		.default([])
		.optional(),
	isMix: z.boolean().default(false).optional(),
})

export const UnpopulatedDefaultTrackSchema = DefaultTrackSchema.extend({
	originalTracks: z.array(zId("Track")).default([]),
})

// Объявление схемы для MongoDB
const MongoTrackSchema = zodSchema(UnpopulatedDefaultTrackSchema, {
	timestamps: true,
})
MongoTrackSchema.pre("save", function (next) {
	this.isMix = this.originalTracks.length > 0
	next()
})
export const Track = model("Track", MongoTrackSchema)

// Объявление схем для действий CRUD
export const InsertTrackSchema = UnpopulatedDefaultTrackSchema.omit({
	isMix: true,
})
export const PatchTrackSchema = UnpopulatedDefaultTrackSchema.partial()

// Объявление схем для описания объектов в БД
export const DbTrackSchema = DefaultTrackSchema.merge(
	z.object({
		_id: zId(),
		createdAt: z.date(),
		updatedAt: z.date(),
		__v: z.number(),
	})
)
type DbPopulatedTrack = z.infer<typeof DbTrackSchema> & {
	originalTracks: DbPopulatedTrack[]
}
export const DbPopulatedTrackSchema: z.ZodType<DbPopulatedTrack> = z.lazy(() =>
	DbTrackSchema.extend({
		originalTracks: DbPopulatedTrackSchema.array(),
	})
)

// Объявление нормализованных схем объектов
export const NormalizedTrackSchema = DefaultTrackSchema.extend({
	id: z.string(),
})
export const NormalizedPopulatedTrackSchema = NormalizedTrackSchema.extend({
	originalTracks: z.array(NormalizedTrackSchema),
})
