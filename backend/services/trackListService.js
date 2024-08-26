import { ABSOLUTE_UPLOADS_FOLDER_PATH } from "../constants.js"
import { Track } from "../database/models/track.js"
import path from "path"

export default {
	async getFullTrackList() {
		return await Track.find().populate("mixedTracks")
	},

	async getTrackById(id) {
		return await Track.findOne({ _id: id }).populate("mixedTracks")
	},

	getTrackThumbnailPath(track) {
		const thumbnailPath = path.join(
			ABSOLUTE_UPLOADS_FOLDER_PATH,
			"thumbnails",
			track.thumbnailName
		)

		return thumbnailPath
	},
}
