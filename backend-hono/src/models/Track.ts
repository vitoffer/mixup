import { model, Schema } from "mongoose"

interface ITrack {
	title: string
}

const trackSchema = new Schema<ITrack>({
	title: { type: String, required: true },
})

const Track = model("Track", trackSchema)

export default Track
