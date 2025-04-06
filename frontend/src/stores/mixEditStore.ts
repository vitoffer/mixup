import { Track } from "@/types"
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
		originalTracks: [] as Track[],
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
			originalTracks: [] as Track[],
		}
	}

	return { mix, clearMix }
})
