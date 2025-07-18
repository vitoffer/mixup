import {
	OriginalTracksSuggestionsRoute,
	SearchTracksRoute,
} from "./apis.routes"
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
	yandexMusic: getYandexMusicSearchResults,
	youtubeMusic: getYoutubeVideosSearchResults,
	spotify: getSpotifySearchResults,
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

export const originalTracksSuggestions: AppRouteHandler<
	OriginalTracksSuggestionsRoute
> = async (c) => {
	const { q } = c.req.valid("query")

	try {
		const res: Partial<Record<PlatformType, CleanedApiSearchResultType[]>> = {}
		for (const platform in platformHandlers) {
			res[platform as PlatformType] = (
				await platformHandlers[platform as PlatformType](q)
			).slice(0, 2)
		}
		return c.json(res, HttpStatusCodes.OK)
	} catch (error) {
		return c.json(
			{ message: `Error fetching suggestions` },
			HttpStatusCodes.INTERNAL_SERVER_ERROR
		)
	}
}
