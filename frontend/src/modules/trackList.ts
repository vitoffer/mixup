import { MixTrack, OriginalTrack } from "@/types"

export function getFilteredTrackList(
	trackList: MixTrack[] | OriginalTrack[],
	searchText: string,
) {
	return trackList.filter((track) => {
		return track.title.toLowerCase().includes(searchText.toLowerCase())
	})
}
