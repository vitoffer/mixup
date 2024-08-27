import { findTrack, loadTrack } from "@/modules/trackPage"
import { ref, watch } from "vue"
import { useRoute } from "vue-router"

export function useTrackPage() {
	const track = ref(null)
	const isTrackLoading = ref(false)

	const route = useRoute()

	watch(
		() => route.params.id,
		async () => {
			track.value = findTrack(route.params.id)

			if (!track.value) {
				isTrackLoading.value = true
				track.value = await loadTrack(route.params.id)
				isTrackLoading.value = false
			}
		},
		{ immediate: true },
	)

	return { track, isTrackLoading }
}
