import { Platform, Track } from "@/types"
import { nextTick, ref } from "vue"
import { useSearchTrackPlatforms } from "./searchTrackPlatforms"
import markIcon from "../../assets/icons/mark.svg?url"
import { useToastStore } from "@/stores/toastStore"
import { AutoCompleteChangeEvent } from "primevue"
import { postSaveTrack } from "@/api/saveTrack"
import { useRouter } from "vue-router"

export const useSavedInfo = () => {
	const router = useRouter()
	const toastStore = useToastStore()

	const savedLinks = ref({
		youtubeMusic: "",
		spotify: "",
		yandexMusic: "",
	})

	const savedThumbnails = ref({
		youtubeMusic: "",
		spotify: "",
		yandexMusic: "",
	})

	const iconStates = ref<Record<Platform, string>>({
		youtubeMusic: markIcon,
		spotify: markIcon,
		yandexMusic: markIcon,
	})

	const {
		trackFoundOnPlatform,
		searchPlatformText,
		platformTrackSuggestions,
		searchTrackOnPlatform,
	} = useSearchTrackPlatforms()

	function clearSavedLink(platform: Platform) {
		savedLinks.value[platform] = ""
		iconStates.value[platform] = markIcon
		savedThumbnails.value[platform] = ""

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
	const originalTracks = ref<Track[]>([])

	function addTag(tag: string) {
		const trimmedTag = tag.trim()
		if (trimmedTag && !tags.value.includes(trimmedTag)) {
			tags.value.push(trimmedTag)
		}
	}

	async function removeTag(tag: string) {
		tags.value = tags.value.filter((filteringTag) => filteringTag !== tag)
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
		savedThumbnails.value[platform] = event.value.thumbnailUrl

		await nextTick()
		trackFoundOnPlatform.value = searchPlatformText.value
	}

	async function saveTrack(isMix: boolean, successMessage: string) {
		const thumbnailUrl =
			savedThumbnails.value.spotify ||
			savedThumbnails.value.yandexMusic ||
			savedThumbnails.value.youtubeMusic ||
			null

		const savedTrack = await postSaveTrack(
			title.value,
			{
				youtubeMusic: savedLinks.value.youtubeMusic || null,
				yandexMusic: savedLinks.value.yandexMusic || null,
				spotify: savedLinks.value.spotify || null,
			},
			artistsNames.value.split(", "),
			tags.value,
			isMix ? [] : originalTracks.value,
			thumbnailUrl,
		)

		if ("error" in savedTrack) {
			return
		}

		toastStore.addToast({ summary: successMessage })
		router.push({ name: isMix ? "trackList" : "createMix" })
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
		iconStates,
		searchTrackOnPlatform,
		saveTrack,
		selectFoundTrackOnPlatform,
		changeText,
	}
}
