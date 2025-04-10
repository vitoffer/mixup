import { SearchTracksRoute } from "./apis.routes"
import { getSpotifySearchResults } from "../../apis/spotify"
import { getYandexMusicSearchResults } from "../../apis/yandex"
import { getYoutubeVideosSearchResults } from "../../apis/youtube"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { PlatformType } from "../../types"
import { CleanedApiSearchResultType } from "../../schemas/apis"
import { AppRouteHandler } from "@/lib/types"

const platformHandlers: Record<
	PlatformType,
	(query: string) => Promise<CleanedApiSearchResultType[]>
> = {
	spotify: getSpotifySearchResults,
	yandexMusic: getYandexMusicSearchResults,
	youtubeMusic: getYoutubeVideosSearchResults,
}

export const searchTracks: AppRouteHandler<SearchTracksRoute> = async (c) => {
	const { platform } = c.req.valid("param")
	const { q } = c.req.valid("query")

	const handler = platformHandlers[platform]

	try {
		const results = await handler(q)

		return c.json(results, HttpStatusCodes.OK)
	} catch (error) {
		return c.json(
			{ message: `Error fetching ${platform} search results` },
			HttpStatusCodes.INTERNAL_SERVER_ERROR
		)
	}
}
