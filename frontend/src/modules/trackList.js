import { addTrackToList } from "@/storage/storage"

export async function loadAllTracks(isLoading) {
	isLoading.value = true

	const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/tracks`)
	const tracks = await response.json()

	tracks.forEach((track) => {
		addTrackToList(track)
	})

	isLoading.value = false
}

export function filterTracks(trackList, searchText) {
	return trackList.filter((track) => {
		return (
			track.name.toLowerCase().includes(searchText.toLowerCase()) ||
			track.authors.some((author) =>
				author.toLowerCase().includes(searchText.toLowerCase()),
			) ||
			track.mixedTracks?.some((mixedTrack) => {
				return (
					mixedTrack.name.toLowerCase().includes(searchText.toLowerCase()) ||
					mixedTrack.authors.some((author) =>
						author.toLowerCase().includes(searchText.toLowerCase()),
					)
				)
			})
		)
	})
}

export function hasYoutubeLink(platforms) {
	return platforms.youtube ?? false
}
