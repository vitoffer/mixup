import { model, Schema } from "mongoose"
import { z } from "zod"

export const ZodTrackSchema = z.object({
	_id: z.string(),
	title: z.string(),
	createdAt: z.number().default(() => Date.now().valueOf()),
	__v: z.number(),
})

const trackSchema = new Schema<z.infer<typeof ZodTrackSchema>>({
	title: { type: String, required: true },
	createdAt: { type: Number, required: true, default: Date.now().valueOf() },
})

const Track = model("Track", trackSchema)

export default Track

export const selectTracksSchema = ZodTrackSchema
export const insertTracksSchema = ZodTrackSchema.omit({
	__v: true,
	_id: true,
	createdAt: true,
})
