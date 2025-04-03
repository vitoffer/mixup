import { fetchTracksOnPlatformByText } from "@/api/searchTrack"
import { loadTracks, trackList } from "@/storage/storage"
import { Track } from "@/types"
import { AutoCompleteCompleteEvent } from "primevue"
import { ref } from "vue"

export const useOriginalTracks = () => {
	const originalTracksSuggestions = ref<
		(Track | { splitter: boolean; text: string })[]
	>([])
	const originalTracksSearchInputRounded = ref(true)

	async function searchOriginalTrack(event: AutoCompleteCompleteEvent) {
		setTimeout(async () => {
			if (trackList.value.length === 0) {
				trackList.value = await loadTracks()
			}

			const suggestions: (Track | { splitter: boolean; text: string })[] =
				trackList.value.filter((track) => {
					return (
						!track.isMix &&
						track.title.toLowerCase().includes(event.query.toLowerCase())
					)
				})

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
