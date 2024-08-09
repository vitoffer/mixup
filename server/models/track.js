import mongoose, { Schema } from "mongoose"

const trackSchema = new Schema({
	name: { type: String, required: true },
	authors: [{ type: String, required: true }],
	imageName: String,
	mixedTracks: [
		{
			type: Schema.Types.ObjectId,
			ref: "Track",
		},
	],
	platformLinks: {
		youtube: String,
		spotify: String,
		vk: String,
		yandex: String,
	},
})

export const Track = mongoose.model("Track", trackSchema)
