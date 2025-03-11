import { createRoute, z } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { jsonContent } from "stoker/openapi/helpers"
import { CleanedApiSearchResult } from "../../schemas/apis"

const tags = ["Apis"]

export const searchSpotify = createRoute({
	path: "/search-spotify",
	method: "get",
	request: {
		query: z.object({
			q: z.string().min(1),
		}),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.array(CleanedApiSearchResult),
			"Spotify search results"
		),
	},
	tags,
})

export const searchYandexMusic = createRoute({
	path: "/search-yandex-music",
	method: "get",
	request: {
		query: z.object({
			q: z.string().min(1),
		}),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.array(CleanedApiSearchResult),
			"Yandex music search results"
		),
	},
	tags,
})
export const searchYoutubeVideos = createRoute({
	path: "/search-youtube-videos",
	method: "get",
	request: {
		query: z.object({
			q: z.string().min(1),
		}),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.array(CleanedApiSearchResult),
			"Youtube videos search results"
		),
		[HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
			z.object({ message: z.string() }),
			"Error on get results"
		),
	},
	tags,
})

export type SearchSpotifyRoute = typeof searchSpotify
export type SearchYandexMusicRoute = typeof searchYandexMusic
export type SearchYoutubeVideosRoute = typeof searchYoutubeVideos
