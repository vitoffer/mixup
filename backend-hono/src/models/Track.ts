import { model, Schema } from "mongoose"
import { z } from "zod"

export const ZTrackSchema = z.object({
	_id: z.string(),
	title: z.string(),
	__v: z.number(),
})

const trackSchema = new Schema<z.infer<typeof ZTrackSchema>>({
	title: { type: String, required: true },
})

const Track = model("Track", trackSchema)

export default Track
