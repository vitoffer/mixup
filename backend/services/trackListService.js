import { ABSOLUTE_UPLOADS_FOLDER_PATH } from "../constants.js"
import { Track } from "../database/models/track.js"
import path from "path"
import fs from "fs"
import fsPromises from "fs/promises"

export default {
	async getFullTrackList() {
		return await Track.find().populate("mixedTracks")
	},

	async getTrackById(id) {
		return await Track.findOne({ _id: id }).populate("mixedTracks")
	},

	async getTrackThumbnailPath(trackId) {
		const thumbnailsPath = path.join(ABSOLUTE_UPLOADS_FOLDER_PATH, "thumbnails")

		const imageExtensions = ["png", "jpg", "jpeg"]

		let thumbnailName = trackId

		for (const ext of imageExtensions) {
			try {
				await fsPromises.access(
					path.join(thumbnailsPath, thumbnailName + "." + ext),
					fs.constants.F_OK
				)

				return path.join(thumbnailsPath, thumbnailName + "." + ext)
			} catch (err) {}
		}
	},
}
