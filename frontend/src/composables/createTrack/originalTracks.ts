import { fetchTracksOnPlatformByText } from "@/api/searchTrack"
import { loadTracks, trackList } from "@/storage/storage"
import { Track, TrackPlatformSearchResult } from "@/types"
import { AutoCompleteCompleteEvent } from "primevue"
import { ref } from "vue"

type TrackSuggestion =
	| Track
	| { splitter: true; text: string }
	| TrackPlatformSearchResult

export const useOriginalTracks = () => {
	const originalTracksSuggestions = ref<TrackSuggestion[]>([])
	const originalTracksSearchInputRounded = ref(true)

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

			let dbTrackListLength = suggestions.length

			if (suggestions.length > 0) {
				suggestions.unshift({ splitter: true, text: "Найденные треки в базе:" })
			}

			if (dbTrackListLength < 5) {
				suggestions.push({
					splitter: true,
					text: "Найденные треки на youtube music",
				})
				suggestions.push(
					...(await fetchTracksOnPlatformByText(
						event.query,
						"youtubeMusic",
						5 - dbTrackListLength,
					)),
				)
			}
			originalTracksSuggestions.value = suggestions
		}, 250)
	}

	return {
		originalTracksSuggestions,
		originalTracksSearchInputRounded,
		searchOriginalTrack,
	}
}
