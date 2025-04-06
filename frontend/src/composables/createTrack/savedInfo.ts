import { Platform, Track, TrackPlatformSearchResult } from "@/types"
import { nextTick, ref } from "vue"
import { useSearchTrackPlatforms } from "./searchTrackPlatforms"
import markIcon from "../../assets/icons/mark.svg?url"
import { useIconStates } from "./iconStates"
import { useToastStore } from "@/stores/toastStore"
import axios, { AxiosResponse } from "axios"
import { AutoCompleteChangeEvent } from "primevue"

export const useSavedInfo = () => {
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

	async function saveTrack(
		title: string,
		urls: Record<Platform, string | null>,
		artistsNames: string[],
		tags: string[],
		originalTracks: (Track | TrackPlatformSearchResult)[],
		thumbnailUrl: string | null,
	) {
		try {
			originalTracks = await Promise.all(
				originalTracks.map(async (originalTrack) => {
					if (!("id" in originalTrack)) {
						const savedOriginalTrack = await saveTrack(
							originalTrack.title,
							{
								spotify: null,
								yandexMusic: null,
								youtubeMusic: originalTrack.url,
							},
							originalTrack.artistsNames,
							[],
							[],
							originalTrack.thumbnailUrl,
						)

						if ("error" in savedOriginalTrack) {
							console.error(
								`Error in saving original track: ${savedOriginalTrack.error}`,
							)
							return {} as Track
						}

						return savedOriginalTrack
					} else {
						return originalTrack
					}
				}),
			)

			originalTracks = originalTracks.filter(
				(obj) => Object.keys(obj).length > 0,
			)

			const { data }: AxiosResponse<Track> = await axios.post(
				`${import.meta.env.VITE_BASE_API_URL}/tracks`,
				{
					title,
					urls,
					artistsNames,
					tags,
					originalTracks: (originalTracks as Track[]).map((track) => track.id),
					thumbnailUrl,
				},
			)

			return data
		} catch (e) {
			toastStore.addToast({
				detail: (e as any).response.data.error.issues
					.map((issue: { message: string }) => issue.message)
					.join("\n"),
			})
			console.error(e)
			return { error: true }
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
		savedThumbnails.value[platform] = event.value.thumbnailUrl

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
		savedThumbnails,
	}
}
