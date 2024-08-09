import { ref } from "vue"

export const trackList = ref([])

export function addTrackToList(track) {
	trackList.value.push(track)
}
