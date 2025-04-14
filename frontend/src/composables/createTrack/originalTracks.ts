import { getOriginalTracksSuggestions } from "@/api/searchTrack"
import { loadTracks, trackList } from "@/modules/trackList"
import { Platform, TrackSuggestion } from "@/types"
import { AutoCompleteCompleteEvent } from "primevue"
import { ref } from "vue"

export const useOriginalTracks = () => {
	const originalTracksSuggestions = ref<
		{ label: string; items: TrackSuggestion[] }[]
	>([])

	const groups: { label: string; items: TrackSuggestion[] }[] = [
		{ label: "Найденные треки в базе:", items: [] },
		{ label: "Найденные треки на яндекс музыке:", items: [] },
		{ label: "Найденные треки на youtube music:", items: [] },
		{ label: "Найденные треки на spotify:", items: [] },
	]

	const platforms: Platform[] = ["yandexMusic", "youtubeMusic", "spotify"]

	async function searchOriginalTrack(event: AutoCompleteCompleteEvent) {
		setTimeout(async () => {
			if (trackList.value.length === 0) {
				trackList.value = await loadTracks()
			}

			const trackListSuggestions: TrackSuggestion[] = trackList.value
				.filter((track) => {
					return (
						!track.isMix &&
						track.title.toLowerCase().includes(event.query.toLowerCase())
					)
				})
				.map((track) => track as TrackSuggestion)
				.slice(0, 2)

			const fetchedPlatformSuggestions =
				(await getOriginalTracksSuggestions(event.query)) || null

			const suggestionsList: { label: string; items: TrackSuggestion[] }[] = []

			for (const [index, group] of groups.entries()) {
				const items =
					index === 0
						? trackListSuggestions
						: fetchedPlatformSuggestions[platforms[index - 1]] || []

				suggestionsList.push({
					label: group.label + (items.length === 0 ? " 0" : ""),
					items,
				})
			}

			originalTracksSuggestions.value = suggestionsList
		}, 250)
	}

	return {
		originalTracksSuggestions,
		searchOriginalTrack,
	}
}
