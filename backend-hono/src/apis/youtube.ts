import axios from "axios"

export async function getYoutubeSearchResults(query: string) {
	try {
		const response = await axios.get(
			`https://www.googleapis.com/youtube/v3/search?q=${query}&part=snippet&key=${process.env.YOUTUBE_KEY}`
		)

		return response.data
	} catch (e) {
		console.error(e)
		return null
	}
}
