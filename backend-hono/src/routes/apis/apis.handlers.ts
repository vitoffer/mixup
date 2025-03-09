import { RouteHandler } from "@hono/zod-openapi"
import {
	SearchSpotifyRoute,
	SearchYandexMusicRoute,
	SearchYoutubeRoute,
} from "./apis.routes"
import { getSpotifySearchResults } from "../../apis/spotify"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { getYandexMusicSearchResults } from "../../apis/yandexMusic"
import { getYoutubeSearchResults } from "../../apis/youtube"

export const searchSpotify: RouteHandler<SearchSpotifyRoute> = async (c) => {
	const { q } = c.req.valid("query")

	const results = await getSpotifySearchResults(q)
	return c.json(results, HttpStatusCodes.OK) as any
}

export const searchYandexMusic: RouteHandler<SearchYandexMusicRoute> = async (
	c
) => {
	const { q } = c.req.valid("query")

	const results = await getYandexMusicSearchResults(q)
	return c.json(results, HttpStatusCodes.OK) as any
}

export const searchYoutube: RouteHandler<SearchYoutubeRoute> = async (c) => {
	const { q } = c.req.valid("query")

	const results = await getYoutubeSearchResults(q)
	return c.json(results, HttpStatusCodes.OK) as any
}
