import { OriginalTrack, Platform } from "@/types"
import { ref } from "vue"
import { useSearchTrackPlatforms } from "./searchTrackPlatforms"
import markIcon from "../../assets/icons/mark.svg?url"
import { useIconStates } from "./iconStates"

export const useSavedInfo = () => {
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
		searchPlatformText,
		platformTrackSuggestions,
		searchTrackOnPlatformRounded,
		iconStates,
		searchTrackOnPlatform,
	}
}
