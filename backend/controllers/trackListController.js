import httpStatus from "http-status-codes"
import trackListService from "../services/trackListService.js"

export default {
	async getFullTrackList(req, res) {
		try {
			const trackList = await trackListService.getFullTrackList()

			res.status(httpStatus.OK).send(trackList)
		} catch (err) {
			console.error("Error in getFullTrackListController: ", { err })

			res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
				status: httpStatus.INTERNAL_SERVER_ERROR,
				errorDetails: err,
			})
		}
	},

	async getTrackById(req, res) {
		try {
			const track = await trackListService.getTrackById(req.params.track_id)

			res.status(httpStatus.OK).send(track)
		} catch (err) {
			console.error("Error in getTrackByIdController: ", { err })

			res
				.status(httpStatus.INTERNAL_SERVER_ERROR)
				.send({ status: httpStatus.INTERNAL_SERVER_ERROR, errorDetails: err })
		}
	},

	async getTrackThumbnailById(req, res) {
		try {
			const trackThumbnailPath = await trackListService.getTrackThumbnailPath(
				req.params.track_id
			)

			res.status(httpStatus.OK).sendFile(trackThumbnailPath)
		} catch (err) {
			console.error("Error in getThumbnailByTrackIdController: ", { err })

			res
				.status(httpStatus.INTERNAL_SERVER_ERROR)
				.send({ status: httpStatus.INTERNAL_SERVER_ERROR, errorDetails: err })
		}
	},
}
