import { Platform, Track } from "@/types"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useMixEditStore = defineStore("mixEdit", () => {
	const mix = ref<{
		id: string | null
		title: string
		artistsNames: string
		tags: string[]
		savedLinks: Record<Platform, string>
		originalTracks: Track[]
	}>({
		id: null,
		title: "",
		artistsNames: "",
		tags: [] as string[],
		savedLinks: {
			youtubeMusic: "",
			spotify: "",
			yandexMusic: "",
		},
		originalTracks: [],
	})

	function clearMix() {
		mix.value = {
			id: null,
			title: "",
			artistsNames: "",
			tags: [] as string[],
			savedLinks: {
				youtubeMusic: "",
				spotify: "",
				yandexMusic: "",
			},
			originalTracks: [],
		}
	}

	return { mix, clearMix }
})
