import axios from "axios"

const proxyUrl = process.env.PROXY_URL

export async function getSpotifySearchResults(query: string): Promise<{
	tracks: object
}> {
	let token: null | string = null

	try {
		const response = await axios.post(
			`https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
			null,
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		)

		token = response.data.access_token
	} catch (e) {
		console.error(e)
	}

	try {
		const response = await axios.get(
			`${proxyUrl}/v1/search?q=${query}&type=track&limit=3`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)

		return response.data
	} catch (e) {
		console.error(e)
		return { tracks: {} }
	}
}
