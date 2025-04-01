import { fetchTracksOnPlatformByText } from "@/api/searchTrack"
import { Platform } from "@/types"
import { AutoCompleteCompleteEvent } from "primevue"
import { ref } from "vue"

export const useSearchTrackPlatforms = () => {
	const trackFoundOnPlatform = ref<object | string>({})
	const searchPlatformText = ref<string>("")
	const platformTrackSuggestions = ref<Record<Platform, object[]>>({
		youtubeMusic: [{}],
		yandexMusic: [{}],
		spotify: [{}],
	})
	const searchTrackOnPlatformRounded = ref(true)

	async function searchTrackOnPlatform(
		event: AutoCompleteCompleteEvent,
		platform: Platform,
	) {
		if (!event.query && !searchPlatformText.value) {
			platformTrackSuggestions.value[platform] = []
			return []
		}

		setTimeout(async () => {
			platformTrackSuggestions.value[platform] =
				await fetchTracksOnPlatformByText(
					event.query || searchPlatformText.value,
					platform,
					5,
				)
		}, 250)
	}

	return {
		trackFoundOnPlatform,
		searchPlatformText,
		platformTrackSuggestions,
		searchTrackOnPlatformRounded,
		searchTrackOnPlatform,
	}
}
