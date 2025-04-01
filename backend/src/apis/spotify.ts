import axios from "axios"
import { HttpProxyAgent } from "http-proxy-agent"
import { SearchResults } from "@spotify/web-api-ts-sdk"
import { z } from "zod"
import { CleanedApiSearchResult } from "../schemas/apis"

const agent = new HttpProxyAgent(
	`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASSWORD}@${process.env.PROXY_HOST}:${process.env.PROXY_PORT}`
)

let tokenCache: {
	accessToken: string
	expiresAt: number
} | null = null

async function fetchSpotifyToken(): Promise<string> {
	const response = await axios.post(
		`https://accounts.spotify.com/api/token`,
		new URLSearchParams({
			grant_type: "client_credentials",
			client_id: process.env.SPOTIFY_CLIENT_ID!,
			client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
		}),
		{
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		}
	)

	const { access_token, expires_in } = response.data
	tokenCache = {
		accessToken: access_token,
		expiresAt: Date.now() + expires_in * 1000 - 5000,
	}

	return access_token
}

async function getSpotifyToken(): Promise<string> {
	if (!tokenCache || Date.now() >= tokenCache.expiresAt) {
		return fetchSpotifyToken()
	}
	return tokenCache.accessToken
}

export async function getSpotifySearchResults(query: string) {
	try {
		const token = await getSpotifyToken()
		const { data }: { data: SearchResults<["track"]> } = await axios.get(
			`https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`,
			{
				headers: { Authorization: `Bearer ${token}` },
				httpAgent: agent,
				httpsAgent: agent,
			}
		)

		const rawTracks = data.tracks.items

		const cleanedTracks: z.infer<typeof CleanedApiSearchResult>[] =
			rawTracks.map((track) => ({
				title: track.name,
				url: track.external_urls.spotify,
				artistsNames: track.artists.map(
					(artist: { name: string }) => artist.name
				),
				thumbnailUrl:
					track.album.images.find((image) => image.width === 64)?.url || "",
			}))

		return cleanedTracks
	} catch (e) {
		console.error(e)
		return null
	}
}
