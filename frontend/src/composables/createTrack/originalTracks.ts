import { OriginalTrack, Track } from "@/types"
import { AutoCompleteCompleteEvent } from "primevue"
import { ref } from "vue"

export const useOriginalTracks = (trackList: Track[]) => {
	const originalTracksSuggestions = ref<OriginalTrack[]>([])
	const originalTracksSearchInputRounded = ref(true)

	function searchOriginalTrack(event: AutoCompleteCompleteEvent) {
		originalTracksSuggestions.value = trackList.filter((track) => {
			return (
				!track.isMix &&
				track.title.toLowerCase().includes(event.query.toLowerCase())
			)
		})
	}

	return {
		originalTracksSuggestions,
		originalTracksSearchInputRounded,
		searchOriginalTrack,
	}
}
