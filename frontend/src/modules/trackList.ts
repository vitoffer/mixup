import { Track } from "@/types"
import axios, { AxiosResponse } from "axios"
import { Ref, ref } from "vue"

export function getFilteredTrackList(trackList: Track[], searchText: string) {
	return trackList.filter((track) => {
		return track.title.toLowerCase().includes(searchText.toLowerCase())
	})
}

export async function loadTracks() {
	const { data }: AxiosResponse<Track[]> = await axios.get(
		`${import.meta.env.VITE_BASE_API_URL}/tracks`,
	)

	return data
}

export const trackList: Ref<Track[]> = ref([])
