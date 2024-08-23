import { reactive } from "vue"

export const trackList = reactive([])

export function addTrackToList(track) {
	trackList.push(track)
}
