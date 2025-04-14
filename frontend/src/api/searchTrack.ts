import { useToastStore } from "@/stores/toastStore"
import { Platform, TrackPlatformSearchResult } from "@/types"
import axios, { AxiosResponse } from "axios"

export async function fetchTracksOnPlatformByText(
	text: string,
	platform: Platform,
	count: number,
) {
	const toastStore = useToastStore()

	try {
		const { data }: AxiosResponse<TrackPlatformSearchResult[]> =
			await axios.get(
				`${import.meta.env.VITE_BASE_API_URL}/search/${platform}`,
				{
					params: {
						q: text,
					},
				},
			)

		return data.slice(0, count)
	} catch (e) {
		toastStore.addToast({ detail: JSON.stringify(e) })
		return []
	}
}

export async function getOriginalTracksSuggestions(text: string) {
	const toastStore = useToastStore()

	try {
		const {
			data,
		}: AxiosResponse<Record<Platform, TrackPlatformSearchResult[]>> =
			await axios.get(
				`${import.meta.env.VITE_BASE_API_URL}/originals-suggestions`,
				{
					params: {
						q: text,
					},
				},
			)

		return data
	} catch (e) {
		toastStore.addToast({ detail: JSON.stringify(e) })
		return {
			yandexMusic: [],
			youtubeMusic: [],
			spotify: [],
		}
	}
}
