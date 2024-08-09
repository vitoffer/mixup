import { Schema, model } from "mongoose"

const validPlatformNames = ["youtube", "spotify", "vk", "yandex"]

const platformLinksValidators = [
	{
		validator: isAllPlatformNamesValid,
		message: "platform name not supported",
	},
	{ validator: isAllPlatformLinksString, message: "link must be string type" },
]

export const trackSchema = new Schema({
	name: { type: String, required: true },
	authors: {
		type: [{ type: String, required: true }],

		validate: {
			validator: (array) => array.length > 0,
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
		validate: platformLinksValidators,
	},
})

export const Track = model("Track", trackSchema)

function isAllPlatformNamesValid(map) {
	for (const key of map.keys()) {
		if (!validPlatformNames.includes(key)) {
			return false
		}
	}
	return true
}

function isAllPlatformLinksString(map) {
	for (const value of map.values()) {
		if (typeof value !== "string") {
			return false
		}
	}
	return true
}
