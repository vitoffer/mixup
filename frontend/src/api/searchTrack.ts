import { useToastStore } from "@/stores/toastStore"
import { Platform } from "@/types"
import axios from "axios"

export async function fetchTracksOnPlatformByText(
	text: string,
	platform: Platform,
	count: number,
) {
	const toastStore = useToastStore()

	const formattedPlatform = {
		youtubeMusic: "youtube",
		yandexMusic: "yandex",
		spotify: "spotify",
	}[platform]

	try {
		const { data } = await axios.get(
			`${import.meta.env.VITE_BASE_API_URL}/search/${formattedPlatform}`,
			{
				params: {
					q: text,
				},
			},
		)

		return data.slice(0, count)
	} catch (e) {
		toastStore.addToast({ detail: JSON.stringify(e) })
	}
}
