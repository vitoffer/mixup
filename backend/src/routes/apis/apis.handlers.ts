import { RouteHandler } from "@hono/zod-openapi"
import { SearchTracksRoute } from "./apis.routes"
import { getSpotifySearchResults } from "../../apis/spotify"
import { getYandexMusicSearchResults } from "../../apis/yandex"
import { getYoutubeVideosSearchResults } from "../../apis/youtube"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { PlatformType } from "../../types"

const providerHandlers: Record<
	PlatformType,
	(query: string) => Promise<any[] | null>
> = {
	spotify: getSpotifySearchResults,
	yandexMusic: getYandexMusicSearchResults,
	youtubeMusic: getYoutubeVideosSearchResults,
}

export const searchTracks: RouteHandler<SearchTracksRoute> = async (c) => {
	const { platform } = c.req.valid("param")
	const { q } = c.req.valid("query")

	const handler = providerHandlers[platform]

	try {
		const results = await handler(q)

		if (!results) {
			throw new Error("Results list is null")
		}

		return c.json(results, HttpStatusCodes.OK)
	} catch (error) {
		return c.json(
			{ message: `Error fetching ${platform} search results` },
			HttpStatusCodes.INTERNAL_SERVER_ERROR
		)
	}
}
