import YTMusic from "ytmusic-api"
import { CleanedApiSearchResultType } from "../schemas/apis"

const api = new YTMusic()
await api.initialize()

export async function getYoutubeVideosSearchResults(query: string) {
	try {
		const videos = await api.searchVideos(query)

		const cleanedVideos: CleanedApiSearchResultType[] = videos.map((video) => ({
			title: video.name,
			url: `https://youtu.be/${video.videoId}`,
			artistsNames: [video.artist.name],
			thumbnailUrl: video.thumbnails[0].url,
		}))

		return cleanedVideos
	} catch (e) {
		console.error(e)
		return []
	}
}
