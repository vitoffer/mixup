import { Track } from "../database/models/track"

export async function addTrackByPlatforms(req, res) {
	try {
		const { youtubeId, spotifyId, yandexId, vkLink, mixedTrackIds } = req.body

		const mixedTracks = mixedTrackIds.map((id) =>
			mongoose.Types.ObjectId.createFromHexString(id)
		)

		const youtubeTrackInfo = ""
		const spotifyTrackInfo = ""
		const yandexTrackInfo = ""

		const track = new Track({
			name,
			authors,
			mixedTracks,
			platformLinks,
		})
	} catch (err) {
		if (err instanceof mongoose.Error) {
			handleError(res, err)
		} else {
			console.error(err.message)
			res.status(500).json({
				error: { name: err.name, message: err.message },
			})
		}
	}
}
