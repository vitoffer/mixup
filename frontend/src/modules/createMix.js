export function findTrackOnPlatforms(
	findTrackNameElement,
	findTrackAuthorsElement,
) {
	const trackName = findTrackNameElement.value
	const trackAuthors = findTrackAuthorsElement.value

	findTrackOnYoutube(trackName, trackAuthors)
	findTrackOnSpotify(trackName, trackAuthors)
	findTrackOnVK(trackName, trackAuthors)
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

	console.log("youtube:", result)
}

async function findTrackOnSpotify(name, authors) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/find-track-on-spotify`,
		{
			method: "POST",
			body: {
				name,
				authors,
			},
		},
	)

	const result = await response.json()

	console.log("spotify:", result)
}

async function findTrackOnVK(name, authors) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/find-track-on-vk`,
		{
			method: "POST",
			body: {
				name,
				authors,
			},
		},
	)

	const result = await response.json()

	console.log("vk:", result)
}

async function findTrackOnYandex(name, authors) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/find-track-on-yandex`,
		{
			method: "POST",
			body: {
				name,
				authors,
			},
		},
	)

	const result = await response.json()

	console.log("yandex:", result)
}
