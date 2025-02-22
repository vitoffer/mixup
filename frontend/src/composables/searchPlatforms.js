import { selectedTrackIdByPlatform } from "@/storage/storage"
import { ref } from "vue"

export function useSearchPlatforms() {
	const foundTrackListByPlatform = ref({
		youtube: [],
		spotify: [],
		yandex: [],
	})

	function findTrackOnPlatforms(searchText) {
		selectedTrackIdByPlatform.value.youtube || findTrackOnYoutube(searchText)
		selectedTrackIdByPlatform.value.spotify || findTrackOnSpotify(searchText)
		selectedTrackIdByPlatform.value.yandex || findTrackOnYandex(searchText)
	}

	async function findTrackOnYoutube(searchText) {
		const response = await fetch(
			`${import.meta.env.VITE_BASE_API_URL}/find-track-on-youtube`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify({
					searchText,
				}),
			},
		)

		const result = await response.json()

		foundTrackListByPlatform.value.youtube = result
	}

	async function findTrackOnSpotify(searchText) {
		const response = await fetch(
			`${import.meta.env.VITE_BASE_API_URL}/find-track-on-spotify`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify({
					searchText,
				}),
			},
		)

		const result = await response.json()

		foundTrackListByPlatform.value.spotify = result
	}

	async function findTrackOnYandex(searchText) {
		const response = await fetch(
			`${import.meta.env.VITE_BASE_API_URL}/find-track-on-yandex`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify({
					searchText,
				}),
			},
		)

		const result = await response.json()

		foundTrackListByPlatform.value.yandex = result
	}

	return {
		foundTrackListByPlatform,
		findTrackOnPlatforms,
	}
}
