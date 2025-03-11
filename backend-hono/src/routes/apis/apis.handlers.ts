import { RouteHandler } from "@hono/zod-openapi"
import { SearchTracksRoute } from "./apis.routes"
import { getSpotifySearchResults } from "../../apis/spotify"
import { getYandexMusicSearchResults } from "../../apis/yandexMusic"
import { getYoutubeVideosSearchResults } from "../../apis/youtubeMusic"
import * as HttpStatusCodes from "stoker/http-status-codes"

const providerHandlers = {
	spotify: getSpotifySearchResults,
	"yandex-music": getYandexMusicSearchResults,
	"youtube-videos": getYoutubeVideosSearchResults,
}

export const searchTracks: RouteHandler<SearchTracksRoute> = async (c) => {
	const { provider } = c.req.valid("param")
	const { q } = c.req.valid("query")

	const handler = providerHandlers[provider]

	try {
		const results = await handler(q)

		if (!results) {
			return c.json(
				{ message: `Error fetching ${provider} search results` },
				HttpStatusCodes.INTERNAL_SERVER_ERROR
			)
		}

		return c.json(results, HttpStatusCodes.OK)
	} catch (error) {
		return c.json(
			{ message: `Error fetching ${provider} search results` },
			HttpStatusCodes.INTERNAL_SERVER_ERROR
		)
	}
}
