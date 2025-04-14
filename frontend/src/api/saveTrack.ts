import { BASIC_TRACKS_ROUTE } from "@/constants"
import { useToastStore } from "@/stores/toastStore"
import { useUserStore } from "@/stores/userStore"
import {
	Platform,
	Track,
	TrackPlatformSearchResult,
	TrackSuggestion,
} from "@/types"
import axios, { AxiosResponse } from "axios"

export async function postSaveTrack(
	id: string | null,
	title: string,
	urls: Record<Platform, string | null>,
	artistsNames: string[],
	tags: string[],
	originalTracks: TrackSuggestion[],
	thumbnailUrl: string | null,
) {
	const toastStore = useToastStore()
	const userStore = useUserStore()

	try {
		originalTracks = await Promise.all(
			originalTracks.map(async (originalTrack) => {
				if (!("id" in originalTrack) || !originalTrack.id) {
					const originalSuggestion = originalTrack as TrackPlatformSearchResult
					const savedOriginalTrack = await postSaveTrack(
						null,
						originalSuggestion.title,
						{
							spotify: null,
							yandexMusic: null,
							youtubeMusic: originalSuggestion.url,
						},
						originalSuggestion.artistsNames,
						[],
						[],
						originalSuggestion.thumbnailUrl,
					)

					if ("error" in savedOriginalTrack) {
						console.error(
							`Error in saving original track: ${savedOriginalTrack.error}`,
						)
						return {} as Track
					}

					return savedOriginalTrack
				} else {
					return originalTrack
				}
			}),
		)

		originalTracks = originalTracks.filter((obj) => Object.keys(obj).length > 0)

		let method, url

		if (!id) {
			method = axios.post
			url = `${BASIC_TRACKS_ROUTE}`
		} else {
			method = axios.patch
			url = `${BASIC_TRACKS_ROUTE}/${id}`
		}

		const { data }: AxiosResponse<Track> = await method(
			url,
			{
				title,
				urls,
				artistsNames,
				tags,
				originalTracks: (originalTracks as Track[]).map((track) => track.id),
				thumbnailUrl,
			},
			{
				headers: {
					Authorization: `Bearer ${userStore.token}`,
				},
			},
		)
		return data
	} catch (e) {
		toastStore.addToast({
			detail: (e as any).response.data.error.issues
				.map((issue: { message: string }) => issue.message)
				.join("\n"),
		})
		console.error(e)
		return { error: true }
	}
}
