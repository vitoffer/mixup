import { ref } from "vue"

export const foundTrackListByPlatform = ref({
	youtube: [],
	spotify: [],
	yandex: [],
})

export function findTrackOnPlatforms(
	findTrackNameElement,
	findTrackAuthorsElement,
) {
	const trackName = findTrackNameElement.value
	const trackAuthors = findTrackAuthorsElement.value

	findTrackOnYoutube(trackName, trackAuthors)
	findTrackOnSpotify(trackName, trackAuthors)
	findTrackOnYandex(trackName, trackAuthors)
}

async function findTrackOnYoutube(name, authors) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/find-track-on-youtube`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				name,
				authors,
			}),
		},
	)

	const result = await response.json()

	foundTrackListByPlatform.value.youtube = result
}

async function findTrackOnSpotify(name, authors) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/find-track-on-spotify`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				name,
				authors,
			}),
		},
	)

	const result = await response.json()

	foundTrackListByPlatform.value.spotify = result
}

async function findTrackOnYandex(name, authors) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/find-track-on-yandex`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				name,
				authors,
			}),
		},
	)

	const result = await response.json()

	foundTrackListByPlatform.value.yandex = result
}
