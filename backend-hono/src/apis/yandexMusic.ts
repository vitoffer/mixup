import axios from "axios"

export async function getYandexMusicSearchResults(query: string) {
	try {
		const response = await axios.get(
			`https://api.music.yandex.net/search?text=${query}&page=0&type=track`
		)

		return response.data.result
	} catch (e) {
		console.error(e)
		return null
	}
}
