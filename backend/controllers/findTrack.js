import youtubeSearch from "youtube-search"
import { YOUTUBE_API_KEY } from "../constants.js"

export function findTrackOnYoutube(req, res) {
	const { name, authors } = req.body

	console.log(req)

	console.log(name, authors)

	var params = {
		key: YOUTUBE_API_KEY,
		maxResults: 5,
		type: "video",
	}

	youtubeSearch(
		name + (authors ? authors.join(", ") : ""),
		params,
		(err, results) => {
			if (err) return console.log(err)

			console.log(results[0])

			const responseArray = []

			results.forEach((result) => {
				responseArray.push({
					name: result.title,
					author: result.channelTitle,
					link: result.link,
					imageUrl: result.thumbnails.medium.url,
				})
			})

			res.send(responseArray)
		}
	)
}

export function findTrackOnSpotify(req, res) {}

export function findTrackOnVK(req, res) {}

export function findTrackOnYandex(req, res) {}
