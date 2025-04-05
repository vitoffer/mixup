import YTMusic from "ytmusic-api"
import { cleanedApiSearchResultType } from "../schemas/apis"

const api = new YTMusic()
await api.initialize()

export async function getYoutubeVideosSearchResults(query: string) {
	try {
		const videos = await api.searchVideos(query)

		const cleanedVideos: cleanedApiSearchResultType[] = videos.map((video) => ({
			title: video.name,
			url: `https://youtu.be/${video.videoId}`,
			artistsNames: [video.artist.name],
			thumbnailUrl: video.thumbnails[0].url,
		}))

		return cleanedVideos
	} catch (e) {
		console.error(e)
		return null
	}
}
