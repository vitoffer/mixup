import { Schema, model } from "mongoose"

export const validPlatformNames = ["youtube", "spotify", "vk", "yandex"]

export const trackSchema = new Schema({
	name: { type: String, required: true },
	authors: {
		type: [{ type: String, required: true }],

		validate: {
			validator: (v) => v.length > 0,
			message: "should have at least one item",
		},
	},
	imageName: String,
	mixedTracks: [
		{
			type: Schema.Types.ObjectId,
			ref: "Track",
		},
	],
	platformLinks: {
		type: Map,
		required: true,
	},
})

export function validateSchemaPlatformLinks() {
	trackSchema.path("platformLinks").validate((v) => {
		for (const key of v.keys()) {
			if (!validPlatformNames.includes(key)) {
				return false
			}
		}
		return true
	}, "platform name not supported")

	trackSchema.path("platformLinks").validate((v) => {
		for (const value of v.values()) {
			if (typeof value !== "string") {
				return false
			}
		}
		return true
	}, "link must be string type")
}

export const Track = model("Track", trackSchema)
