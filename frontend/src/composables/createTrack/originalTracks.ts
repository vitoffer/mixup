import { fetchTracksOnPlatformByText } from "@/api/searchTrack"
import { loadTracks, trackList } from "@/modules/trackList"
import { Track, TrackPlatformSearchResult } from "@/types"
import { AutoCompleteCompleteEvent } from "primevue"
import { nextTick, ref } from "vue"

type TrackSuggestion =
	| Track
	| { splitter: true; text: string }
	| TrackPlatformSearchResult

export const useOriginalTracks = () => {
	const originalTracksSuggestions = ref<TrackSuggestion[]>([])

	async function searchOriginalTrack(event: AutoCompleteCompleteEvent) {
		setTimeout(async () => {
			if (trackList.value.length === 0) {
				trackList.value = await loadTracks()
			}

			const suggestions: TrackSuggestion[] = trackList.value
				.filter((track) => {
					return (
						!track.isMix &&
						track.title.toLowerCase().includes(event.query.toLowerCase())
					)
				})
				.map((track) => track as TrackSuggestion)
				.slice(0, 2)

			if (suggestions.length > 0) {
				suggestions.unshift({ splitter: true, text: "Найденные треки в базе:" })
			}

			const platformFunctions = [
				async () => {
					suggestions.push({
						splitter: true,
						text: "Найденные треки на яндекс музыке",
					})
					const yandexTracks = await fetchTracksOnPlatformByText(
						event.query,
						"yandexMusic",
						2,
					)
					suggestions.push(...yandexTracks)
					originalTracksSuggestions.value = suggestions
				},
				async () => {
					suggestions.push({
						splitter: true,
						text: "Найденные треки на youtube music",
					})
					const youtubeTracks = await fetchTracksOnPlatformByText(
						event.query,
						"youtubeMusic",
						2,
					)
					suggestions.push(...youtubeTracks)
					originalTracksSuggestions.value = suggestions
				},
				async () => {
					suggestions.push({
						splitter: true,
						text: "Найденные треки на spotify",
					})
					const spotifyTracks = await fetchTracksOnPlatformByText(
						event.query,
						"spotify",
						2,
					)
					suggestions.push(...spotifyTracks)
					originalTracksSuggestions.value = suggestions
				},
			]

			for (const platformFunction of platformFunctions) {
				try {
					await platformFunction()
				} catch (error) {
					console.error("Ошибка при выполнении запроса:", error)
				}
			}
		}, 250)
	}

	return {
		originalTracksSuggestions,
		searchOriginalTrack,
	}
}
