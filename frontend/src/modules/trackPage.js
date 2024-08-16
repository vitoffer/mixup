import { trackList } from "@/storage"

export function findTrack(id) {
	return trackList.find((track) => track._id === id) ?? null
}

export async function loadTrack(id, track, isTrackLoading) {
	isTrackLoading.value = true

	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/tracks/${id}`,
	)
	track.value = await response.json()

	isTrackLoading.value = false
}
