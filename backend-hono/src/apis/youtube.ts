import YTMusic from "ytmusic-api"

const api = new YTMusic()
await api.initialize()

export async function getYoutubeVideosSearchResults(query: string) {
	try {
		const videos = await api.searchVideos(query)

		const cleanedVideos = videos.map((video) => {
			const { type, ...cleanedVideo } = video

			return cleanedVideo
		})

		return cleanedVideos
	} catch (e) {
		console.error(e)
		return null
	}
}
