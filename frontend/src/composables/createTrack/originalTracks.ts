import { getOriginalTracksSuggestions } from "@/api/searchTrack"
import { loadTracks, trackList } from "@/modules/trackList"
import {
	Platform,
	TempOriginalTrack,
	Track,
	TrackPlatformSearchResult,
	TrackSuggestion,
} from "@/types"
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

	function generateBaseTrackSchema(
		suggestion: TrackPlatformSearchResult,
		platform: Platform,
	): TempOriginalTrack {
		return {
			title: suggestion.title,
			urls: {
				yandexMusic: platform === "yandexMusic" ? suggestion.url : null,
				youtubeMusic: platform === "youtubeMusic" ? suggestion.url : null,
				spotify: platform === "spotify" ? suggestion.url : null,
			},
			thumbnailUrl: suggestion.thumbnailUrl,
			artistsNames: suggestion.artistsNames,
		}
	}

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

			const formattedPlatformSuggestions = Object.entries(
				fetchedPlatformSuggestions,
			).map((entry) => {
				const [platform, suggestions] = entry
				return suggestions.map((suggestion) =>
					generateBaseTrackSchema(suggestion, platform as Platform),
				)
			})

			const suggestionsList: { label: string; items: TrackSuggestion[] }[] = []

			for (const [index, group] of groups.entries()) {
				const items =
					index === 0
						? trackListSuggestions
						: formattedPlatformSuggestions[index - 1] || []

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
