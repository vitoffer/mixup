import axios from "axios"
import { SearchTracksResponse } from "ym-api/dist/types"
import { z } from "zod"
import { CleanedYandexMusicSearchResult } from "../schemas/yandexMusic"

export async function getYandexMusicSearchResults(query: string) {
	try {
		const response: { data: { result: SearchTracksResponse } } =
			await axios.get(
				`https://api.music.yandex.net/search?text=${query}&page=0&type=track`
			)

		const cleanedTracks: z.infer<typeof CleanedYandexMusicSearchResult>[] =
			response.data.result.tracks.results.map((track) => ({
				title: track.title,
				url: `https://music.yandex.ru/album/${track.albums[0].id}/track/${track.id}`,
				artists: track.artists.map((artist) => artist.name),
			}))

		return cleanedTracks
	} catch (e) {
		console.error(e)
		return null
	}
}
