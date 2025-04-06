import { Track } from "@/types"

export function getFilteredTrackList(trackList: Track[], searchText: string) {
	return trackList.filter((track) => {
		return track.title.toLowerCase().includes(searchText.toLowerCase())
	})
}
