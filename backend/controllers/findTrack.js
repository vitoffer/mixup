import youtubeSearch from "youtube-search"
import { YOUTUBE_API_KEY, SPOTIFY_ID, SPOTIFY_SECRET } from "../constants.js"
import SpotifyWebApi from "spotify-web-api-node"

export function findTrackOnYoutube(req, res) {
	const { name: searchName, authors: searchAuthors } = req.body

	var params = {
		key: YOUTUBE_API_KEY,
		maxResults: 5,
		type: "video",
	}

	youtubeSearch(
		searchName + (searchAuthors ? searchAuthors.join(", ") : ""),
		params,
		(err, results) => {
			if (err) return console.log(err)

			const responseArray = []

			results.forEach((result) => {
				responseArray.push({
					name: result.title,
					authors: [result.channelTitle],
					link: result.link,
					imageUrl: result.thumbnails.medium.url,
				})
			})

			res.send(responseArray)
		}
	)
}

export async function findTrackOnSpotify(req, res) {
	const { name: searchName, authors: searchAuthors } = req.body

	const spotifyApi = new SpotifyWebApi({
		clientId: SPOTIFY_ID,
		clientSecret: SPOTIFY_SECRET,
	})

	try {
		const data = await spotifyApi.clientCredentialsGrant()

		const token = data.body["access_token"]
		const expiresIn = data.body["expires_in"]

		// console.log("The access token expires in " + expiresIn)
		// console.log("The access token is " + token)

		spotifyApi.setAccessToken(token)
	} catch (err) {
		console.log("Something went wrong when retrieving an access token", err)
	}

	const results = await spotifyApi.searchTracks(
		`${searchName} ${searchAuthors ? searchAuthors.join(", ") : ""}`,
		{ limit: 5 }
	)

	const tracks = results.body.tracks.items

	const resultTracks = tracks.map((track) => {
		return {
			name: track.name,
			authors: track.artists.map((artist) => artist.name),
			link: track.external_urls.spotify,
			imageUrl: track.album.images[1].url,
		}
	})

	res.send(resultTracks)
}

export function findTrackOnVK(req, res) {}

export function findTrackOnYandex(req, res) {}
