import YTMusic, { VideoDetailed } from "ytmusic-api"
import { z } from "zod"
import { CleanedApiSearchResult } from "../schemas/apis"

const api = new YTMusic()
await api.initialize()

export async function getYoutubeVideosSearchResults(query: string) {
	try {
		const videos = await api.searchVideos(query)

		const cleanedVideos: z.infer<typeof CleanedApiSearchResult>[] = videos.map(
			(video) => ({
				title: video.name,
				url: `https://youtu.be/${video.videoId}`,
				artistsNames: [video.artist.name],
			})
		)

		return cleanedVideos
	} catch (e) {
		console.error(e)
		return null
	}
}
