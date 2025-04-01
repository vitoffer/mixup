import { OriginalTrack, Platform } from "@/types"
import { nextTick, ref } from "vue"
import { useSearchTrackPlatforms } from "./searchTrackPlatforms"
import markIcon from "../../assets/icons/mark.svg?url"
import { useIconStates } from "./iconStates"
import { useToastStore } from "@/stores/toastStore"
import axios from "axios"
import { AutoCompleteChangeEvent } from "primevue"

export const useSavedInfo = () => {
	const toastStore = useToastStore()

	const savedLinks = ref({
		youtubeMusic: "",
		spotify: "",
		yandexMusic: "",
	})

	const { iconStates } = useIconStates()

	const {
		trackFoundOnPlatform,
		searchPlatformText,
		platformTrackSuggestions,
		searchTrackOnPlatformRounded,
		searchTrackOnPlatform,
	} = useSearchTrackPlatforms()

	function clearSavedLink(platform: Platform) {
		savedLinks.value[platform] = ""
		iconStates.value[platform] = markIcon

		if (Object.values(savedLinks.value).every((link) => link.length === 0)) {
			title.value = ""
			artistsNames.value = ""
			trackFoundOnPlatform.value = ""
			searchPlatformText.value = ""
		}

		;(
			document.querySelector(
				".platform-search .p-inputtext",
			) as HTMLInputElement
		).classList.remove("p-filled")
	}

	const currentPlatform = ref<Platform>("youtubeMusic")

	const title = ref<string>("")
	const artistsNames = ref<string>("")
	const tags = ref<string[]>([])
	const originalTracks = ref<OriginalTrack[]>([])

	function addTag(tag: string) {
		const trimmedTag = tag.trim()
		if (trimmedTag && !tags.value.includes(trimmedTag)) {
			tags.value.push(trimmedTag)
		}
	}

	async function removeTag(tag: string) {
		tags.value = tags.value.filter((filteringTag) => filteringTag !== tag)
	}

	async function saveTrack() {
		try {
			const { data, status } = await axios.post(
				`${import.meta.env.VITE_BASE_API_URL}/tracks`,
				{
					title: title.value,
					urls: {
						youtubeMusic: savedLinks.value.youtubeMusic || null,
						yandexMusic: savedLinks.value.yandexMusic || null,
						spotify: savedLinks.value.spotify || null,
					},
					artistsNames: artistsNames.value.split(", "),
					tags: tags.value,
					mixedTracks: originalTracks.value.map((track) => track.id),
				},
			)

			console.log(status, data)
			return data
		} catch (e) {
			toastStore.addToast({
				detail: (e as any).response.data.error.issues
					.map((issue: { message: string }) => issue.message)
					.join("\n"),
			})
		}
	}

	async function selectFoundTrackOnPlatform(
		event: AutoCompleteChangeEvent,
		platform: Platform,
	) {
		const allLinksEmpty =
			Object.keys(savedLinks.value).filter(
				(key) => key !== platform && savedLinks.value[key as Platform],
			).length === 0

		if (!title.value || allLinksEmpty) {
			title.value = event.value.title
		}

		if (artistsNames.value.length === 0 || allLinksEmpty) {
			artistsNames.value = event.value.artistsNames.join(", ")
		}

		savedLinks.value[platform] = event.value.url

		await nextTick()
		trackFoundOnPlatform.value = searchPlatformText.value
	}

	function changeText(event: AutoCompleteChangeEvent) {
		if (typeof event.value === "object") {
			return
		}
		searchPlatformText.value = event.value
	}

	return {
		savedLinks,
		clearSavedLink,
		currentPlatform,
		title,
		artistsNames,
		tags,
		originalTracks,
		addTag,
		removeTag,
		trackFoundOnPlatform,
		platformTrackSuggestions,
		searchTrackOnPlatformRounded,
		iconStates,
		searchTrackOnPlatform,
		saveTrack,
		selectFoundTrackOnPlatform,
		changeText,
	}
}
