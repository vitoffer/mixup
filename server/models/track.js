const mongoose = require("mongoose")

const Schema = mongoose.Schema

const trackSchema = new Schema(
	{
		_id: Schema.Types.ObjectId,
		imageUrl: String,
		title: { type: String, required: true },
		author: { type: String, required: true },
		tracksInside: [String],
		platforms: [
			new Schema(
				{
					platform: String,
					link: String,
				},
				{
					_id: false,
				}
			),
		],
	},
	{
		versionKey: false, // You should be aware of the outcome after set to false
	}
)

const Track = mongoose.model("Track", trackSchema)

module.exports = Track
