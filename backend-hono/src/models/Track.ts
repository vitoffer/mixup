import { model, Schema } from "mongoose"
import { z } from "zod"

export const ZodTrackSchema = z.object({
	_id: z.string(),
	__v: z.number(),
	title: z.string().min(1, "Title is required"),
	createdAt: z.date().default(() => new Date()),
	updatedAt: z.date().default(() => new Date()),
})

const trackSchema = new Schema<z.infer<typeof ZodTrackSchema>>({
	title: { type: String, required: true },
	createdAt: { type: Date, required: true, default: () => new Date() },
	updatedAt: { type: Date, required: true, default: () => new Date() },
})

const Track = model("Track", trackSchema)

export default Track

export const selectTracksSchema = ZodTrackSchema
export const insertTracksSchema = ZodTrackSchema.omit({
	__v: true,
	_id: true,
	createdAt: true,
	updatedAt: true,
})
export const patchTracksSchema = insertTracksSchema.partial().openapi({
	example: {},
})
