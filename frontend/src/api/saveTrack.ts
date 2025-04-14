import { useToastStore } from "@/stores/toastStore"
import { useUserStore } from "@/stores/userStore"
import { Platform, Track, TrackSuggestion } from "@/types"
import axios, { AxiosResponse } from "axios"

export async function postSaveTrack(
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
				if (!("id" in originalTrack)) {
					const savedOriginalTrack = await postSaveTrack(
						originalTrack.title,
						{
							spotify: null,
							yandexMusic: null,
							youtubeMusic: originalTrack.url,
						},
						originalTrack.artistsNames,
						[],
						[],
						originalTrack.thumbnailUrl,
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

		const { data }: AxiosResponse<Track> = await axios.post(
			`${import.meta.env.VITE_BASE_API_URL}/tracks`,
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
