import { trackList } from "@/storage/storage"

export function findTrack(id) {
	return trackList.find((track) => track._id === id) ?? null
}

export async function loadTrack(id) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/tracks/${id}`,
	)
	const track = await response.json()

	return track
}
