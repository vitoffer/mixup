import { trackList } from "@/storage/storage"
import { MixTrack, OriginalTrack } from "@/types"

// export async function loadAllTracks() {
// 	try {
// 		const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/tracks`)
// 		const tracks = await response.json()

// 		tracks.forEach((track) => {
// 			trackList.push(track)
// 		})
// 	} catch (err) {
// 		console.error(err)
// 	}
// }

export function getFilteredTrackList(
	trackList: MixTrack[] | OriginalTrack[],
	searchText: string,
) {
	return trackList.filter((track) => {
		return track.title.toLowerCase().includes(searchText.toLowerCase())
	})
}

// function trackContainsText(track, text) {
// 	return (
// 		track.name.toLowerCase().includes(text.toLowerCase()) ||
// 		track.authors.some((author) =>
// 			author.toLowerCase().includes(text.toLowerCase()),
// 		)
// 	)
// }

// export function hasYoutubeLink(platforms) {
// 	return platforms.youtube ?? false
// }
