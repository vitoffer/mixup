import { OriginalTrack } from "@/types"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useMixEditStore = defineStore("mixEdit", () => {
	const mix = ref({
		title: "",
		artistsNames: "",
		tags: [] as string[],
		savedLinks: {
			youtubeMusic: "",
			spotify: "",
			yandexMusic: "",
		},
		originalTracks: [] as OriginalTrack[],
	})

	function clearMix() {
		mix.value = {
			title: "",
			artistsNames: "",
			tags: [] as string[],
			savedLinks: {
				youtubeMusic: "",
				spotify: "",
				yandexMusic: "",
			},
			originalTracks: [] as OriginalTrack[],
		}
	}

	return { mix, clearMix }
})
