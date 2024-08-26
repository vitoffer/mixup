import httpStatus from "http-status-codes"
import trackListService from "../services/trackListService.js"

export default {
	async getFullTrackList(req, res) {
		let response
		try {
			const trackList = await trackListService.getFullTrackList()

			response = { status: httpStatus.OK, responseData: trackList }
			res.status(response.status).send(response)
		} catch (err) {
			console.error("Error in getFullTrackListController: ", { err })

			res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
				status: httpStatus.INTERNAL_SERVER_ERROR,
				errorDetails: err,
			})
		}
	},

	async getTrackById(req, res) {
		let response
		try {
			const track = await trackListService.getTrackById(req.params.track_id)

			response = { status: httpStatus.OK, responseData: track }
			res.status(response.status).send(response)
		} catch (err) {
			console.error("Error in getTrackByIdController: ", { err })

			res
				.status(httpStatus.INTERNAL_SERVER_ERROR)
				.send({ status: httpStatus.INTERNAL_SERVER_ERROR, errorDetails: err })
		}
	},
	async getTrackThumbnailById(req, res) {
		try {
			const track = await trackListService.getTrackById(req.params.track_id)
			const trackThumbnailPath = trackListService.getTrackThumbnailPath(track)

			res.status(httpStatus.OK).sendFile(trackThumbnailPath)
		} catch (err) {
			console.error("Error in getThumbnailByTrackIdController: ", { err })

			res
				.status(httpStatus.INTERNAL_SERVER_ERROR)
				.send({ status: httpStatus.INTERNAL_SERVER_ERROR, errorDetails: err })
		}
	},
}
