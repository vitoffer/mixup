import httpStatus from "http-status-codes"
import trackListService from "../services/trackListService.js"

export default {
	async getFullTrackList(req, res) {
		let response
		try {
			response = await trackListService.getFullTrackList()

			res.status(response.httpStatus).send(response)
		} catch (err) {
			console.error("Error in getFullTrackListController: ", { err })

			res
				.status(httpStatus.INTERNAL_SERVER_ERROR)
				.send({ status: httpStatus.INTERNAL_SERVER_ERROR, errorDetails: err })
		}
	},

	async getTrackById(req, res) {
		let response
		try {
			response = await trackListService.getTrackById(req.params.track_id)

			res.status(response.httpStatus).send(response)
		} catch (err) {
			console.error("Error in getTrackByIdController: ", { err })

			res
				.status(httpStatus.INTERNAL_SERVER_ERROR)
				.send({ status: httpStatus.INTERNAL_SERVER_ERROR, errorDetails: err })
		}
	},
}
