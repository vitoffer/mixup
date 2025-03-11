import { createRoute, z } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { jsonContent } from "stoker/openapi/helpers"
import { youtubeVideoSearchResult } from "../../schemas/youtube"
import { CleanedSpotifySearchResult } from "../../schemas/spotify"

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
			z.array(CleanedSpotifySearchResult),
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
			z.object({
				page: z.number(),
				perPage: z.number(),
				tracks: z.object({
					total: z.number(),
					perPage: z.number(),
					results: z.array(
						z.object({
							id: z.number(),
							title: z.string(),
							artists: z.array(
								z.object({
									id: z.number(),
									name: z.string(),
									cover: z.object({
										uri: z.string(),
									}),
								})
							),
							albums: z.array(
								z.object({
									id: z.number(),
									title: z.string(),
								})
							),
							coverUri: z.string(),
						})
					),
				}),
			}),
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
			z.array(youtubeVideoSearchResult),
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
