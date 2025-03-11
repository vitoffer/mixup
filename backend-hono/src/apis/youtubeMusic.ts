import YTMusic, { VideoDetailed } from "ytmusic-api"
import { CleanedYoutubeVideoSearchResult } from "../schemas/youtubeMusic"
import { z } from "zod"

const api = new YTMusic()
await api.initialize()

export async function getYoutubeVideosSearchResults(query: string) {
	try {
		const videos = await api.searchVideos(query)

		const cleanedVideos: z.infer<typeof CleanedYoutubeVideoSearchResult>[] =
			videos.map((video) => ({
				title: video.name,
				url: `https://youtu.be/${video.videoId}`,
				artist: video.artist.name,
			}))

		return cleanedVideos
	} catch (e) {
		console.error(e)
		return null
	}
}
