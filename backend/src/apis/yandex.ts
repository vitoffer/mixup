import axios from "axios"
import { SearchTracksResponse } from "ym-api/dist/types"
import { CleanedApiSearchResultType } from "../schemas/apis"

export async function getYandexMusicSearchResults(query: string) {
	try {
		const response: { data: { result: SearchTracksResponse } } =
			await axios.get(
				`https://api.music.yandex.net/search?text=${query}&page=0&type=track`
			)

		const cleanedTracks: CleanedApiSearchResultType[] =
			response.data.result.tracks.results.map((track) => ({
				title: track.title,
				url: `https://music.yandex.ru/album/${track.albums[0].id}/track/${track.id}`,
				artistsNames: track.artists.map((artist) => artist.name),
				thumbnailUrl: `https://${track.coverUri.slice(0, -2)}200x200`,
			}))

		return cleanedTracks
	} catch (e) {
		console.error(e)
		return null
	}
}
