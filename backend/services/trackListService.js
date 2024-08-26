import { Track } from "../models/track.js"
import httpStatus from "http-status-codes"

export default {
	async getFullTrackList() {
		let result = {}
		try {
			const trackList = await Track.find().populate("mixedTracks")

			result = { status: httpStatus.OK, responseData: trackList }
			return result
		} catch (err) {
			console.error("Error in getFullTrackListService: ", { err })
			result = { status: httpStatus.BAD_REQUEST, errorDetails: err }
			return result
		}
	},
	async getTrackById(id) {
		let result = {}
		try {
			const track = await Track.findOne({ _id: id }).populate("mixedTracks")

			result = { status: httpStatus.OK, responseData: track }
			return result
		} catch (err) {
			console.error("Error in getTrackByIdService: ", { err })

			result = { status: httpStatus.BAD_REQUEST, errorDetails: err }
			return result
		}
	},
}
