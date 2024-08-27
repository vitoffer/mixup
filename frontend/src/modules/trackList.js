import { trackList } from "@/storage/storage"

export async function loadAllTracks() {
	try {
		const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/tracks`)
		const tracks = await response.json()

		tracks.forEach((track) => {
			trackList.push(track)
		})
	} catch (err) {
		console.error(err)
	}
}

export function getFilteredTrackList(trackList, searchText) {
	return trackList.filter((track) => {
		return (
			trackContainsText(track, searchText) ||
			track.mixedTracks?.some((mixedTrack) => {
				return trackContainsText(mixedTrack, searchText)
			})
		)
	})
}

function trackContainsText(track, text) {
	return (
		track.name.toLowerCase().includes(text.toLowerCase()) ||
		track.authors.some((author) =>
			author.toLowerCase().includes(text.toLowerCase()),
		)
	)
}

export function hasYoutubeLink(platforms) {
	return platforms.youtube ?? false
}
