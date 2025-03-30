import { useToastStore } from "@/stores/toastStore"
import { Platform } from "@/types"
import axios from "axios"
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

	const toastStore = useToastStore()

	async function searchTrackOnPlatform(
		event: AutoCompleteCompleteEvent,
		platform: Platform,
	) {
		if (!event.query && !searchPlatformText.value) {
			platformTrackSuggestions.value[platform] = []
			return
		}

		const formattedPlatform = {
			youtubeMusic: "youtube",
			yandexMusic: "yandex",
			spotify: "spotify",
		}[platform]

		setTimeout(async () => {
			try {
				const { data } = await axios.get(
					`${import.meta.env.VITE_BASE_API_URL}/search/${formattedPlatform}`,
					{
						params: {
							q: event.query || searchPlatformText.value,
						},
					},
				)

				platformTrackSuggestions.value[platform] = data.slice(0, 5)
			} catch (e) {
				toastStore.addToast({ detail: JSON.stringify(e) })
			}
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
